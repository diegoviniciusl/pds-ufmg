import React from 'react';
import { Link, Typography } from '@mui/material';
import {
  Link as LinkRouter,
} from 'react-router-dom';
import LinkMui from '@mui/material/Link';
import { Page } from '../../../../../interfaces';
import { images } from '../../../../utils/public';
import AvatarImg from '../../../avatar-img';
import { User } from '../../../../../models';
import handleLogout from '../../../../utils/handle-logout';
import sideMenuService from '../../services/side-menu-service';

interface Props {
  pages: Page[];
  currentPage: Page;
  currentUser: User;
}

export default function SideMenu({ pages, currentPage, currentUser }: Props) {
  const sideBarMenuPages = pages.filter((page) => page.sideMenuOption);
  const displayedName = sideMenuService.getDisplayedName(currentUser.name);

  return (
    <div className="flex flex-col w-60 h-full bg-white">
      <div className="flex flex-col">
        <div className="flex m-auto flex-col mt-10 mb-5">
          <img
            width="167px"
            height="45px"
            src={images.gpjLogo.src}
            alt={images.gpjLogo.alt}
          />
        </div>
        <div className="flex m-auto border border-grey-100 w-10/12 mb-4" />
      </div>

      {sideBarMenuPages.map((page) => {
        const bgColor = page.path === currentPage?.path ? 'bg-purple-light' : 'bg-white-main';
        const textColor = page.path === currentPage?.path ? 'text-grey-600' : 'text-grey-200';
        return (
          <div
            key={page.path}
            className={`flex w-10/12 h-12 m-auto flex-col mt-1 mb-2 justify-center rounded-xl hover:bg-purple-light ${bgColor}`}
          >
            <Link
              component={LinkRouter}
              to={page.path}
              style={{ color: 'inherit', textDecoration: 'inherit' }}
              className="flex flex-row align-middle w-full h-full"
            >
              <div className={`ml-5 my-auto ${textColor}`}>{page.sideMenuOption?.icon}</div>
              <div className={`ml-3 my-3 ${textColor}`}>
                <Typography variant="h4">{page.sideMenuOption?.title}</Typography>
              </div>
            </Link>
          </div>
        );
      })}
      <div className="flex flex-col h-full justify-end items-center">
        <div className="w-9/12 flex justify-start flex-row mb-8">
          <div className="mr-3 mt-1">
            <AvatarImg name={currentUser.name} />
          </div>
          <div>
            <Typography variant="h4">{displayedName}</Typography>
            <LinkMui
              style={{ textDecoration: 'inherit' }}
              component="button"
              onClick={handleLogout}
            >
              Sair
            </LinkMui>
          </div>
        </div>
      </div>
    </div>
  );
}
