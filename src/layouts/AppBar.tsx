import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  Box,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import usFlag from '../assets/images/flags/us.png';
import trFlag from '../assets/images/flags/tr.png';
import { useKeycloak } from '@react-keycloak/web';

interface AppBarProps {
  drawerWidth: number;
}
import Menu from '@mui/material/Menu';
import orangeAvatar from '../assets/images/avatars/orange.png';
import theme from '../theme';


const AppBarComponent: React.FC<AppBarProps> = ({ drawerWidth }) => {
  const { keycloak, initialized } = useKeycloak();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [language, setLanguage] = React.useState('EN');

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value as string);
  };

  const languageOptions = [
    { code: 'EN', label: 'EN', flag: usFlag },
    { code: 'TR', label: 'TR', flag: trFlag },
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    if (keycloak && typeof keycloak.login === 'function') {
      keycloak.login();
    }
    handleMenuClose();
  };

  const handleLogout = () => {
    if (keycloak && typeof keycloak.logout === 'function') {
      keycloak.logout();
    }
    handleMenuClose();
  };

  const userDisplayName = keycloak.authenticated ? (keycloak.tokenParsed?.preferred_username || keycloak.tokenParsed?.email || 'User') : 'User Profile';

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        marginLeft: { sm: `${drawerWidth}px` },
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)', 
        zIndex: theme.zIndex.drawer, 
        boxShadow: theme.shadows[2], 
      }}
      elevation={0} 
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} /> 

        {/* Language Selector */}
        <FormControl variant="standard" sx={{
          m: 1,
          minWidth: 70, 
          '& .MuiInput-underline:before': { borderBottom: 'none' }, 
          '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
          '& .MuiInput-underline:after': { borderBottom: 'none' }, 
          '& .MuiSelect-icon': { display: 'none' }, 
          color: 'rgba(0, 0, 0, 0.87)'
        }}>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            sx={{
              color: 'rgba(0, 0, 0, 0.87)',
              fontSize: '0.875rem',
              paddingTop: '2px', 
              paddingBottom: '2px',
              '.MuiSelect-select': {
                paddingRight: '0px !important', 
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'transparent' 
              },
            }}
            IconComponent={() => null} 
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: 'white',
                  color: 'rgba(0, 0, 0, 0.87)',
                  marginTop: '8px',
                  boxShadow: theme.shadows[3],
                }
              }
            }}
            renderValue={(selectedValue) => {
              const selectedOption = languageOptions.find(option => option.code === selectedValue);
              return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {selectedOption && <img src={selectedOption.flag} alt={selectedOption.label} style={{ width: 18, height: 'auto', maxHeight: 12, marginRight: 6, borderRadius: '2px' }} />}
                  <Typography component="span" variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.87)', mr: 0.5 }}>{selectedValue}</Typography>
                  <KeyboardArrowDownIcon sx={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '1.1rem' }} />
                </Box>
              );
            }}
          >
            {languageOptions.map((option) => (
              <MenuItem
                key={option.code}
                value={option.code}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.875rem',
                  color: 'rgba(0, 0, 0, 0.87)', 
                  backgroundColor: 'transparent', 
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)', 
                    color: 'rgba(0, 0, 0, 0.87)',
                  }
                }}
              >
                <img src={option.flag} alt={option.label} style={{ width: 20, height: 'auto', maxHeight: 15, marginRight: 8, borderRadius: '2px' }} />
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* User Profile Section */}
        {initialized && (
          <>
            <Box 
              onClick={handleMenuOpen} 
              sx={{
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer', 
                p: 0.5,
                mr: 1, 
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <Avatar alt={userDisplayName} src={orangeAvatar} sx={{ width: 32, height: 32}} />
              {keycloak.authenticated && (
                <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.87)', ml: 1, mr: 0.5 }}>
                  {userDisplayName}
                </Typography>
              )}
              <KeyboardArrowDownIcon sx={{ color: 'rgba(0, 0, 0, 0.54)', opacity: keycloak.authenticated ? 1 : 0.7 }} />
            </Box>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'profile-button',
              }}
              PaperProps={{
                sx: {
                  backgroundColor: 'white',
                  color: 'rgba(0, 0, 0, 0.87)',
                  marginTop: '8px',
                  boxShadow: theme.shadows[3],
                }
              }}
            >
              {keycloak.authenticated ? (
                [
                  <MenuItem key="logout" onClick={handleLogout} sx={{
                  fontSize: '0.875rem',
                  color: 'rgba(0, 0, 0, 0.87)',
                  backgroundColor: 'transparent',
                  '&:hover': { 
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    color: 'rgba(0, 0, 0, 0.87)',
                  }
                }}>Logout</MenuItem>
                ]
              ) : (
                <MenuItem onClick={handleLogin} sx={{
                  fontSize: '0.875rem',
                  color: 'rgba(0, 0, 0, 0.87)',
                  backgroundColor: 'transparent',
                  '&:hover': { 
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    color: 'rgba(0, 0, 0, 0.87)',
                  }
                }}>Login</MenuItem>
              )}
            </Menu>
          </>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBarComponent;
