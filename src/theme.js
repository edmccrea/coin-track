import { createTheme } from '@mui/material';
import { blueGrey, teal } from '@mui/material/colors';

export const themeDark = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#001E3C',
    },
    text: {
      primary: '#f8f9fa',
    },
    primary: {
      light: 'rgba(59,130,246,0.5)',
      main: '#f8f9fa',
      dark: blueGrey[700],
      contrastText: '#fff',
    },
    secondary: {
      light: '#CCCCCC',
      main: '#9B9B9B',
      dark: teal[700],
      contrastText: '#fff',
    },
  },
});

export const themeLight = createTheme({
  palette: {
    background: {
      default: '#f8f9fa',
    },
    text: {
      primary: '#001E3C',
    },
    primary: {
      light: 'rgba(59,130,246,0.5)',
      main: '#121212',
      dark: blueGrey[700],
      contrastText: '#fff',
    },
    secondary: {
      light: '#CCCCCC',
      main: '#9B9B9B',
      dark: teal[700],
      contrastText: '#fff',
    },
  },
});
