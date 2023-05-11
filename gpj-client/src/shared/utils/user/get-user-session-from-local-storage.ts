import { UserSession } from '../../../interfaces';
import { USER_SESSION_KEY } from '../constants';

const getUserSessionFromLocalStorage = (): UserSession | null => {
  const localStorageUserSession = localStorage.getItem(USER_SESSION_KEY);

  if (!localStorageUserSession) return null;

  const userSession = JSON.parse(localStorageUserSession) as UserSession;

  return userSession;
};

export default getUserSessionFromLocalStorage;
