import React, { useMemo } from 'react';
import { User } from '../../models';
import pages from '../../pages';
import { Path } from '../../shared/enums';
import getUserSessionFromLocalStorage from '../../shared/utils/user/get-user-session-from-local-storage';
import ContextProviderProps from '../ContextProviderProps';
import useUserContext from '../user/context';
import { PagesContext } from './context';

function PagesContextProvider({ children }: ContextProviderProps) {
  const getFilteredPages = (user: User, isUserAuthenticated: boolean) => {
    let loggedUser: User | undefined = user;

    if (!isUserAuthenticated) {
      const userSession = getUserSessionFromLocalStorage();
      loggedUser = userSession?.user;
    }

    if (!loggedUser) return pages.filter((page) => page.path === Path.LOGIN);

    return pages.filter((page) => !page.restrictedUserRoles
      || page.restrictedUserRoles.some((role) => role === loggedUser?.role));
  };

  const { user, isUserAuthenticated } = useUserContext();
  const contextPages = getFilteredPages(user, isUserAuthenticated);

  const value = useMemo(
    () => ({
      pages: contextPages,
    }),
    [contextPages],
  );

  return (
    <PagesContext.Provider value={value}>{children}</PagesContext.Provider>
  );
}

export default PagesContextProvider;
