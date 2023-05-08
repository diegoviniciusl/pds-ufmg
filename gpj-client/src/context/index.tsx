import React from 'react';
import ContextProviderProps from './ContextProviderProps';
import PagesContextProvider from './page/provider';
import TableContextProvider from './table/provider';
import UserContextProvider from './user/provider';

function AplicationContextProvider({ children }: ContextProviderProps) {
  return (
    <UserContextProvider>
      <PagesContextProvider>
        <TableContextProvider>
          {children}
        </TableContextProvider>
      </PagesContextProvider>
    </UserContextProvider>
  );
}

export default AplicationContextProvider;
