import { USER_SESSION_KEY } from './constants';

const handleLogout = () => {
  localStorage.removeItem(USER_SESSION_KEY);

  window.location.href = '/';
};

export default handleLogout;
