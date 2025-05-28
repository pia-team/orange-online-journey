import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import theme from '../theme';
import Sidebar from './Sidebar';
import AppBarComponent from './AppBar';

const EXPANDED_DRAWER_WIDTH = 240;

const MainLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [effectiveSidebarWidth, setEffectiveSidebarWidth] = useState(EXPANDED_DRAWER_WIDTH);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarWidthChange = (newWidth: number) => {
    setEffectiveSidebarWidth(newWidth);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarComponent drawerWidth={effectiveSidebarWidth} />
        <Sidebar
          drawerWidth={EXPANDED_DRAWER_WIDTH}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          onWidthChange={handleSidebarWidthChange}
        />

        <Box
          component='main'
          sx={(theme) => ({
            flexGrow: 1,
            width: { sm: `calc(100% - ${effectiveSidebarWidth}px)` },
            marginLeft: { sm: `${effectiveSidebarWidth}px` },
            display: 'flex',
            flexDirection: 'column',
            marginTop: theme.mixins.toolbar.minHeight ? `${theme.mixins.toolbar.minHeight}px` : '64px', 
            height: `calc(100vh - ${theme.mixins.toolbar.minHeight ? `${theme.mixins.toolbar.minHeight}px` : '64px'})`,
            backgroundColor: theme.palette.background.default,
            paddingLeft: 0,
            paddingRight: 0, 
            overflow: 'hidden', 
          })}
        >
          <Outlet />
        </Box>
      </Box>
    </MuiThemeProvider>
  );
};

export default MainLayout;
