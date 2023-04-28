const stringToColor = (string: string) => {
  let hash = 0;

  const splitted = string.split('');
  splitted.forEach((letter) => {
    // eslint-disable-next-line no-bitwise
    hash = letter.charCodeAt(0) + ((hash << 5) - hash);
  });

  let color = '#';

  Array(3).fill(0).forEach((_, index) => {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (index * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  });

  return color;
};

const stringToLetters = (name: string) => {
  if (/\s/.test(name)) {
    return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
  }
  return `${name.split(' ')[0][0]}`;
};

const avatarImgService = {
  stringToColor,
  stringToLetters,
};

export default avatarImgService;
