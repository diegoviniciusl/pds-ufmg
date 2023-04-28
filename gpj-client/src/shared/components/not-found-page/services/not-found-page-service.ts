import { Path } from '../../../enums';

const getDefaultPath = (isUserAuthenticated: boolean): Path => {
  if (isUserAuthenticated) return Path.TRIALS;

  return Path.LOGIN;
};

const notFoundPageService = {
  getDefaultPath,
};

export default notFoundPageService;
