const getDisplayedName = (name: string): string => {
  const nameTokens = name.split(' ');
  const maxNameLength = 25;

  return nameTokens.reduce((displayedName, nameToken) => {
    if ((displayedName.length + nameToken.length) > maxNameLength) return displayedName;

    return displayedName.concat(` ${nameToken}`);
  }, '');
};

const sideMenuService = {
  getDisplayedName,
};

export default sideMenuService;
