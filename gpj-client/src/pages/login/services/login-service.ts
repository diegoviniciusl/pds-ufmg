import { AxiosError, AxiosResponse } from 'axios';
import JwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { AccessTokenPayload, LoginAttributes, UserSession } from '../../../interfaces';
import { api } from '../../../libs';
import LoginResponse from '../../../libs/api/responses/auth/login-response';
import ErrorResponse from '../../../libs/api/responses/error-response';
import { User } from '../../../models';
import { USER_SESSION_KEY } from '../../../shared/utils/constants';
import toastMessages from '../../../shared/utils/toast-messages';

const login = async (loginAttributes: LoginAttributes) : Promise<User> => {
  let loginResponse: AxiosResponse<LoginResponse>;

  try {
    loginResponse = await api.auth.login(loginAttributes);
  } catch (error: unknown) {
    toast.error(toastMessages.error.NOT_FOUND_USER);
    throw (error as AxiosError<ErrorResponse>);
  }

  const { accessToken } = loginResponse.data;

  const accessTokenPayload = JwtDecode<AccessTokenPayload>(accessToken);

  const userSession: UserSession = {
    accessToken,
    user: accessTokenPayload.user,
  };

  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(userSession));

  return accessTokenPayload.user;
};

const loginService = {
  login,
};

export default loginService;
