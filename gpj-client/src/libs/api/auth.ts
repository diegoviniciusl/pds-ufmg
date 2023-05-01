import axiosInstance from './config/axios';
import LoginRequest from './requests/auth/login-request';
import LoginResponse from './responses/auth/login-response';

const AUTH_BASE_URL = '/auth';

const login = async (request: LoginRequest) => axiosInstance.post<LoginResponse>(`${AUTH_BASE_URL}/login`, request);

export default {
  login,
};
