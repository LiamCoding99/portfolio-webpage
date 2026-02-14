import { createTheme } from '@mui/material/styles';

/**
 * Material Design 3 Theme Configuration
 * Based on Material You design principles
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Material Blue
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 12, // MD3 rounded corners
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '0px 3px 5px rgba(0, 0, 0, 0.1)',
    '0px 4px 6px rgba(0, 0, 0, 0.1)',
    '0px 5px 10px rgba(0, 0, 0, 0.12)',
    '0px 6px 12px rgba(0, 0, 0, 0.12)',
    '0px 8px 16px rgba(0, 0, 0, 0.14)',
    '0px 10px 20px rgba(0, 0, 0, 0.14)',
    '0px 12px 24px rgba(0, 0, 0, 0.16)',
    '0px 14px 28px rgba(0, 0, 0, 0.16)',
    '0px 16px 32px rgba(0, 0, 0, 0.18)',
    '0px 18px 36px rgba(0, 0, 0, 0.18)',
    '0px 20px 40px rgba(0, 0, 0, 0.2)',
    '0px 22px 44px rgba(0, 0, 0, 0.2)',
    '0px 24px 48px rgba(0, 0, 0, 0.22)',
    '0px 26px 52px rgba(0, 0, 0, 0.22)',
    '0px 28px 56px rgba(0, 0, 0, 0.24)',
    '0px 30px 60px rgba(0, 0, 0, 0.24)',
    '0px 32px 64px rgba(0, 0, 0, 0.26)',
    '0px 34px 68px rgba(0, 0, 0, 0.26)',
    '0px 36px 72px rgba(0, 0, 0, 0.28)',
    '0px 38px 76px rgba(0, 0, 0, 0.28)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 20,
          padding: '10px 24px',
        },
        contained: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
