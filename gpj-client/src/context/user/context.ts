import { createContext, useContext } from 'react';
import { User } from '../../models';
import { Role } from '../../shared/enums';

interface UserContextInformation {
  user: User;
  isUserAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<User>>
  setIsUserAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export const USER_CONTEXT_DEFAULT_VALUE = {
  user: {
    name: '',
    role: Role.USER,
    email: '',
    phone: '',
  } as User,
  isUserAuthenticated: false,
  setUser: () => null,
  setIsUserAuthenticated: () => null,
} as UserContextInformation;

export const UserContext = createContext<UserContextInformation>(USER_CONTEXT_DEFAULT_VALUE);

const useUserContext = () => useContext(UserContext);

export default useUserContext;
