import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { CreateUserAttributes, UpdateUserAttributes } from '../../../interfaces';
import { api } from '../../../libs';
import errorMessages from '../../../libs/api/helpers/error-messages';
import ErrorResponse from '../../../libs/api/responses/error-response';
import CreateUserResponse from '../../../libs/api/responses/user/create-user-response';
import GetUsersResponse from '../../../libs/api/responses/user/get-users-response';
import UpdateUserResponse from '../../../libs/api/responses/user/update-user-response';
import { User } from '../../../models';
import toastMessages from '../../../shared/utils/toast-messages';

const createUser = async (createUserAttributes: CreateUserAttributes): Promise<User> => {
  let createUserResponse: AxiosResponse<CreateUserResponse>;
  try {
    createUserResponse = await api.user.createUser(createUserAttributes);
  } catch (error: unknown) {
    const errorMessage = (error as AxiosError<ErrorResponse>).response?.data.message;

    switch (errorMessage) {
      case errorMessages.EMAIL_BELONGS_TO_A_USER: {
        toast.error(toastMessages.error.EMAIL_BELONGS_TO_A_USER);
        break;
      }
      default: {
        toast.error(toastMessages.error.DEFAULT);
      }
    }

    throw (error as AxiosError<ErrorResponse>);
  }

  toast.success(toastMessages.success.DEFAULT);
  return createUserResponse?.data;
};

const updateUser = async (updateUserAttributes: UpdateUserAttributes): Promise<User> => {
  let updateUserResponse: AxiosResponse<UpdateUserResponse>;
  try {
    updateUserResponse = await api.user.updateUser(updateUserAttributes);
  } catch (error: unknown) {
    const errorMessage = (error as AxiosError<ErrorResponse>).response?.data.message;

    switch (errorMessage) {
      case errorMessages.EMAIL_BELONGS_TO_A_USER: {
        toast.error(toastMessages.error.EMAIL_BELONGS_TO_A_USER);
        break;
      }
      case errorMessages.CAN_NOT_DEACTIVATE_OWN_USER: {
        toast.error(toastMessages.error.CAN_NOT_DEACTIVATE_OWN_USER);
        break;
      }
      case errorMessages.CAN_NOT_REGRESS_OWN_PERMISSION: {
        toast.error(toastMessages.error.CAN_NOT_REGRESS_OWN_PERMISSION);
        break;
      }
      default: {
        toast.error(toastMessages.error.DEFAULT);
      }
    }

    throw (error as AxiosError<ErrorResponse>);
  }

  toast.success(toastMessages.success.DEFAULT);
  return updateUserResponse?.data;
};

const getUsers = async (): Promise<GetUsersResponse> => {
  const getUsersResponse: AxiosResponse<GetUsersResponse> = await api.user.getUsers();
  return getUsersResponse.data;
};

const partialMatchKeys = ['name', 'email'] as (keyof User)[];
const fullMatchKeys = ['userId', 'phone'] as (keyof User)[];

const usersService = {
  createUser,
  updateUser,
  getUsers,
  partialMatchKeys,
  fullMatchKeys,
};

export default usersService;
