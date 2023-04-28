import {
  Location, matchRoutes,
} from 'react-router-dom';
import { Page } from '../../../../interfaces';

const getCurrentPage = (pages: Page[], location: Location): Page | undefined => {
  const [foundPage] = matchRoutes(pages, location) || [];
  return pages.find((page) => page.path === foundPage.pathname);
};

const layoutService = {
  getCurrentPage,
};

export default layoutService;
