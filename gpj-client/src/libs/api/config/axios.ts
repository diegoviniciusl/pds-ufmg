import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import ErrorResponse from '../responses/error-response';
import getUserSessionFromLocalStorage from '../../../shared/utils/user/get-user-session-from-local-storage';
import handleLogout from '../../../shared/utils/handle-logout';
import toastMessages from '../../../shared/utils/toast-messages';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}/v1`,
});

type StatusCodeList = (number | undefined)[];

export const logoutStatusCodes: StatusCodeList = [401, 403];
export const expectedErrorsStatusCodes: StatusCodeList = [400, 404];

axiosInstance.interceptors.request.use(
  (config) => {
    const userSession = getUserSessionFromLocalStorage();

    if (config.headers && userSession) {
      // eslint-disable-next-line no-param-reassign, @typescript-eslint/dot-notation
      config.headers['Authorization'] = `Bearer ${userSession.accessToken}`;
    }

    return config;
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    const statusCode = error.response?.status;

    if (logoutStatusCodes.includes(statusCode)) {
      toast.error(toastMessages.error.UNAUTHORIZED_USER);
      handleLogout();
      return;
    }

    if (!expectedErrorsStatusCodes.includes(statusCode)) {
      toast.error(toastMessages.error.UNEXPECTED_ERROR);
    }

    // eslint-disable-next-line consistent-return
    return Promise.reject(error);
  },
);

export default axiosInstance;
