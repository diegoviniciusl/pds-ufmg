import React, { useEffect, useMemo, useState } from 'react';
import { User } from '../../models';
import ContextProviderProps from '../ContextProviderProps';
import { UserContext, USER_CONTEXT_DEFAULT_VALUE } from './context';
import getUserSessionFromLocalStorage from '../../shared/utils/user/get-user-session-from-local-storage';

function UsuarioContextProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState<User>(USER_CONTEXT_DEFAULT_VALUE.user);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const userSession = getUserSessionFromLocalStorage();

    if (!userSession) return;

    setUser(userSession.user);
    setIsUserAuthenticated(true);
  }, [setUser, setIsUserAuthenticated]);

  const value = useMemo(
    () => ({
      user,
      isUserAuthenticated,
      setUser,
      setIsUserAuthenticated,
    }),
    [user, isUserAuthenticated, setUser, setIsUserAuthenticated],
  );

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
}

export default UsuarioContextProvider;
