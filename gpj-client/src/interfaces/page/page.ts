import { ReactElement } from 'react';
import { PageTitle, Path, Role } from '../../shared/enums';
import SideMenuOption from './side-menu-option';

interface Page {
  path: Path;
  component: ReactElement;
  title?: PageTitle;
  sideMenuOption?: SideMenuOption;
  withoutLayout?: boolean;
  restrictedUserRoles?: Role[];
}

export default Page;
