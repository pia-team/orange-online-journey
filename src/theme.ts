import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark', 
    primary: {
      main: orange[500], 
    },
    secondary: {
      main: '#1e2129', 
    },
    background: {
      default: '#ffffff', 
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: orange[700], 
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '100% !important',
        },
      },
    },
  }
});

export default theme;
