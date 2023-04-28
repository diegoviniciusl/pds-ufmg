import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import usePagesContext from '../../../context/page/context';
import useUserContext from '../../../context/user/context';
import { SideMenu } from './components';
import layoutService from './services/layout-service';

interface Props {
  children: ReactElement;
}

export default function Layout({ children }: Props) {
  const { pages } = usePagesContext();
  const { user } = useUserContext();
  const location = useLocation();
  const currentPage = layoutService.getCurrentPage(pages, location);
  const showLayout = currentPage && !currentPage.withoutLayout;

  return (
    <div className="w-screen h-full bg-grey-background">
      {showLayout ? (
        <div className="flex flex-row w-full min-h-screen">
          <div className="w-60 flex flex-col">
            <SideMenu pages={pages} currentPage={currentPage} currentUser={user} />
          </div>
          <div className="flex flex-col w-full h-full pt-10 pl-10 pr-10 overflow-hidden">
            <div className="mb-10">
              <Typography color="text.primary" variant="h1">{currentPage?.title}</Typography>
            </div>
            {children}
          </div>
        </div>
      )
        : (
          <div className="w-full h-screen">
            {children}
          </div>
        )}
    </div>
  );
}
