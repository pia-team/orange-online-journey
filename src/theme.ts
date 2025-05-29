import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light', 
    primary: {
      main: orange[500], 
    },
    secondary: {
      main: '#1e2129', 
    },
    background: {
      default: '#ffffff', 
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: 'rgba(0, 0, 0, 0.7)',
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
          padding: '8px 16px !important',
          marginTop: '8px !important',
        },
      },
    },
  }
});

export default theme;
