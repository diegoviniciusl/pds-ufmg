import { createTheme } from '@mui/material';
import { ROW_HEIGHT_SIZE } from '../shared/utils/constants';

const themeConfiguration = require('./themeConfiguration');

const theme = createTheme({
  spacing: themeConfiguration.spacingMultiplier,
  palette: {
    primary: {
      main: themeConfiguration.colors.purple.main,
      light: themeConfiguration.colors.purple.light,
    },
    secondary: {
      main: themeConfiguration.colors.purple.main,
      light: themeConfiguration.colors.purple.light,
    },
    success: {
      main: themeConfiguration.colors.green.main,
      light: themeConfiguration.colors.green.lightest,
    },
    error: {
      main: themeConfiguration.colors.red.main,
      light: themeConfiguration.colors.red.lightest,
    },
    text: {
      primary: themeConfiguration.colors.grey[600],
      secondary: themeConfiguration.colors.grey[400],
      disabled: themeConfiguration.colors.grey[400],
    },
    background: {
      default: themeConfiguration.colors.grey.background,
      paper: themeConfiguration.colors.white,
    },
    common: {
      white: themeConfiguration.colors.white,
      black: themeConfiguration.colors.black,
    },
  },
  typography: {
    fontFamily: 'Inter',
    h1: {
      fontWeight: themeConfiguration.font.weight.bold,
      fontSize: themeConfiguration.font.size.h1,
    },
    h2: {
      fontWeight: themeConfiguration.font.weight.semiBold,
      fontSize: themeConfiguration.font.size.h2,
    },
    h3: {
      fontWeight: themeConfiguration.font.weight.medium,
      fontSize: themeConfiguration.font.size.h3,
    },
    h4: {
      fontWeight: themeConfiguration.font.weight.semiBold,
      fontSize: themeConfiguration.font.size.h4,
    },
    body1: {
      fontSize: themeConfiguration.font.size.h4,
    },
    body2: {
      fontWeight: themeConfiguration.font.weight.regular,
      fontSize: themeConfiguration.font.size.body,
    },
    caption: {
      fontWeight: themeConfiguration.font.weight.regular,
      fontSize: themeConfiguration.font.size.caption,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: themeConfiguration.spacingMultiplier * 4,
          boxShadow: 'none',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          minWidth: themeConfiguration.spacingMultiplier * 45,
        },
        outlinedPrimary: {
          minWidth: themeConfiguration.spacingMultiplier * 45,
        },
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          borderRadius: themeConfiguration.spacingMultiplier * 4,
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: themeConfiguration.spacingMultiplier * 2,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: themeConfiguration.spacingMultiplier * ROW_HEIGHT_SIZE,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          padding: '0px 16px',
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        noOptionsText: 'Sem opções',
      },
    },
  },
});

export default theme;
