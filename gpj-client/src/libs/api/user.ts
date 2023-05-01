import axiosInstance from './config/axios';
import CreateUserRequest from './requests/user/create-user-request';
import UpdateUserRequest from './requests/user/update-user-request';
import CreateUserResponse from './responses/user/create-user-response';
import GetUsersResponse from './responses/user/get-users-response';
import UpdateUserResponse from './responses/user/update-user-response';

const USER_BASE_URL = '/user';

const createUser = async (request: CreateUserRequest) => (axiosInstance.post<CreateUserResponse>(USER_BASE_URL, request));

const updateUser = async (request: UpdateUserRequest) => (axiosInstance.patch<UpdateUserResponse>(`${USER_BASE_URL}/${request.userId}`, request));

const getUsers = async () => (axiosInstance.get<GetUsersResponse>(USER_BASE_URL));

export default {
  createUser,
  getUsers,
  updateUser,
};
