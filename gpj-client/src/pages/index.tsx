import React from 'react';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {
  PageTitle, Path, Role, SideMenuTitle,
} from '../shared/enums';
import Companies from './companies/companies';
import Login from './login/login';
import Trials from './trials/trials';
import Users from './users/users';
import { Page } from '../interfaces';

const pages: Page[] = [
  {
    path: Path.LOGIN,
    component: <Login />,
    withoutLayout: true,
  },
  {
    path: Path.TRIALS,
    component: <Trials />,
    title: PageTitle.TRIALS,
    sideMenuOption: {
      title: SideMenuTitle.TRIALS,
      icon: <AssignmentOutlinedIcon />,
    },
  },
  {
    path: Path.COMPANIES,
    component: <Companies />,
    title: PageTitle.COMPANIES,
    sideMenuOption: {
      title: SideMenuTitle.COMPANIES,
      icon: <AccountBalanceOutlinedIcon />,
    },
  },
  {
    path: Path.USERS,
    component: <Users />,
    title: PageTitle.USERS,
    sideMenuOption: {
      title: SideMenuTitle.USERS,
      icon: <PersonOutlineOutlinedIcon />,
    },
    restrictedUserRoles: [Role.ADMIN],
  },
];

export default pages;
