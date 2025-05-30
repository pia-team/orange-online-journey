import React, { useState } from 'react';
import { Box, CssBaseline, Container } from '@mui/material';
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
      {/* Root container */}
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        
        {/* Header - App Bar */}
        <AppBarComponent drawerWidth={effectiveSidebarWidth} />
        
        {/* Sidebar */}
        <Sidebar
          drawerWidth={EXPANDED_DRAWER_WIDTH}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          onWidthChange={handleSidebarWidthChange}
        />

        {/* Main Content Area */}
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            width: { xs: '100%', sm: `calc(100% - ${effectiveSidebarWidth}px)` },
            transition: 'margin 0.2s ease-in-out',
            display: 'flex', 
            flexDirection: 'column'
          }}
        >
          {/* Toolbar offset for fixed app bar */}
          <Box sx={(theme) => ({ 
            ...theme.mixins.toolbar,
            flexShrink: 0
          })} />
          
          {/* Content container with padding */}
          <Container 
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column', 
              maxWidth: 'none'
            }}
          >
              <Outlet />
          </Container>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
};

export default MainLayout;
