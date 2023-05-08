const SPACING_MULTIPLIER = 4;

const getSpacing = () => {
  const spacingOption = 500;

  return Array(spacingOption).fill(0).map((_, optionId) => {
    const spacingSize = optionId * SPACING_MULTIPLIER;
    return `${spacingSize}px`;
  });
};

module.exports = {
  colors: {
    yellow: {
      main: '#ff9800',
      light: '#ffd494',
    },
    green: {
      main: '#43a047',
      light: '#72ef71',
      lightest: '#cafcc9',
    },
    cyan: {
      main: '#00bcd4',
      light: '#93e2ec',
    },
    red: {
      main: '#f44336',
      light: '#FFA9A3',
      lightest: '#ffe4e4',
    },
    blue: {
      main: '#1976d2',
      light: '#9ec4ea',
    },
    purple: {
      main: '#562bf7',
      light: '#e6d9fe',
      extralight: '#F1F1FA',
    },
    lime: {
      lightest: '#f0f4c3',
    },
    grey: {
      800: '#000a12',
      600: '#263238',
      400: '#4f5b62',
      200: '#9da8ae',
      100: '#f1f1fa',
      50: '#fafdff',
      background: '#eceff1',
    },
    white: '#ffffff',
    black: '#000000',
  },
  font: {
    weight: {
      thin: 100,
      extraLight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      black: 900,
    },
    size: {
      h1: '36px',
      h2: '24px',
      h3: '18px',
      h4: '16px',
      body: '14px',
      caption: '12px',
    },
  },
  spacingMultiplier: SPACING_MULTIPLIER,
  spacing: getSpacing(),
};
