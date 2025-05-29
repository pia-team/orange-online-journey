import React, { useEffect } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Avatar,
  Divider,
  Collapse,
} from '@mui/material';
import { useKeycloak } from '@react-keycloak/web';
import { useTheme } from '@mui/material/styles';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import orangeLogo from '../assets/images/logos/orange-logo.png';
import userAvatar from '../assets/images/avatars/orange.png';
import { orange } from '@mui/material/colors';

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  onWidthChange?: (width: number) => void;
}

const COLLAPSED_WIDTH = 80;

const Sidebar: React.FC<SidebarProps> = ({
  drawerWidth: expandedWidth,
  mobileOpen,
  handleDrawerToggle,
  onWidthChange,
}) => {
  const location = useLocation();
  const theme = useTheme();
  const { keycloak, initialized } = useKeycloak();
  const [adminOpen, setAdminOpen] = React.useState(false);
  const [isManuallyOpen, setIsManuallyOpen] = React.useState(true);
  const [isHovering, setIsHovering] = React.useState(false);

  const handleAdminClick = () => {
    setAdminOpen(!adminOpen);
  };

  const handlePermanentDrawerToggle = () => {
    setIsManuallyOpen(!isManuallyOpen);
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    if (!isManuallyOpen) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const isEffectivelyOpen = isManuallyOpen || isHovering;
  const currentWidth = isEffectivelyOpen ? expandedWidth : COLLAPSED_WIDTH;

  useEffect(() => {
    if (onWidthChange) {
      onWidthChange(currentWidth);
    }
  }, [currentWidth, onWidthChange]);

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        width: currentWidth,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isEffectivelyOpen ? 'space-between' : 'center',
          p: 1,
          pl: isEffectivelyOpen ? 2.5 : 1.5,
          pr: 1,
          height: '64px',
          gap: !isEffectivelyOpen ? '4px' : 0,
          backgroundColor: theme.palette.secondary.main
        }}
      >
        <img
          src={orangeLogo}
          alt="Orange Logo"
          style={{
            height: isEffectivelyOpen ? '30px' : '10px',
            opacity: isEffectivelyOpen || !isManuallyOpen ? 1 : 0, 
            transition: 'opacity 0.3s, height 0.3s',
            marginLeft: isEffectivelyOpen ? 0 : '2px',
          }}
        />
        <IconButton onClick={handlePermanentDrawerToggle} sx={{ color: 'common.white' }}>
          {isManuallyOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Box sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.secondary.main }}>
        <Avatar
          src={userAvatar}
          alt="User Avatar"
          sx={{
            width: isEffectivelyOpen ? 56 : 40,
            height: isEffectivelyOpen ? 56 : 40,
            margin: '0 auto 8px auto',
            transition: theme.transitions.create(['width', 'height'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        />
        {initialized && keycloak.authenticated && isEffectivelyOpen && (
          <>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.white',
                mt: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {keycloak.tokenParsed?.preferred_username || keycloak.tokenParsed?.name || 'User Name'}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'text.white',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {keycloak.tokenParsed?.email || 'user@example.com'}
            </Typography>
          </>
        )}
      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

      <List component="nav" 
      sx={{ flexGrow: 1,
       pt: isEffectivelyOpen ? 1 : 0, backgroundColor: '#2d323e',
       '& .MuiTypography-root, & .MuiSvgIcon-root': {
                color: 'white !important',
              }, }}>
        {[
          { text: 'Main Page', icon: <DashboardIcon />, path: '/' },
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
            title={item.text}
            sx={{
              justifyContent: isEffectivelyOpen ? 'initial' : 'center',
              px: 2.5,
              mb: 0.5,
              minHeight: 48,
              '&.Mui-selected': {
                backgroundColor: orange[700],
                '&:hover': {
                  backgroundColor: orange[800],
                },
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                  color: 'common.white',
                },
              },
              '&:hover': {
                backgroundColor: !isEffectivelyOpen && !(location.pathname === item.path)
                  ? 'action.hover'
                  : undefined,
              },
              '& .MuiTypography-root': {
                color: 'white !important',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isEffectivelyOpen ? 3 : 'auto',
                justifyContent: 'center',
                color: location.pathname === item.path ? 'common.white' : 'text.secondary',
                transition: theme.transitions.create('margin', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
                '&:hover': {
                  color: location.pathname === item.path ? 'common.white' : orange[500],
                },
                color: 'white !important',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                opacity: isEffectivelyOpen ? 1 : 0,
                transition: theme.transitions.create('opacity', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
                whiteSpace: 'nowrap',
              }}
              primaryTypographyProps={{
                color: location.pathname === item.path ? 'common.white' : 'text.primary',
              }}
            />
          </ListItem>
        ))}

        <ListItem
          button
          onClick={handleAdminClick}
          title="Admin Panel"
          sx={{
            justifyContent: isEffectivelyOpen ? 'initial' : 'center',
            px: 2.5,
            mt: 1,
            minHeight: 48,
            '& .MuiTypography-root': {
                color: 'white !important',
              },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: isEffectivelyOpen ? 3 : 'auto',
              justifyContent: 'center',
              color: 'text.secondary',
              transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              '&:hover': { color: orange[500] },
              color: 'white !important',
            }}
          >
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary="Admin Panel"
            sx={{
              opacity: isEffectivelyOpen ? 1 : 0,
              transition: theme.transitions.create('opacity', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              whiteSpace: 'nowrap',
            }}
            primaryTypographyProps={{ color: 'text.primary' }}
          />
          {isEffectivelyOpen && (adminOpen ? <ExpandLess sx={{ color: 'text.secondary' }} /> : <ExpandMore sx={{ color: 'text.secondary' }} />)}
        </ListItem>
        <Collapse in={adminOpen && isEffectivelyOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              component={RouterLink}
              to="/admin/user-management"
              selected={location.pathname === '/admin/user-management'}
              title="User Management"
              sx={{
                pl: isEffectivelyOpen ? 4 : 2.5,
                justifyContent: isEffectivelyOpen ? 'initial' : 'center',
                minHeight: 48,
                '&.Mui-selected': {
                  backgroundColor: orange[600],
                  '&:hover': {
                    backgroundColor: orange[700],
                  },
                  '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: 'common.white',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isEffectivelyOpen ? 3 : 'auto',
                  justifyContent: 'center',
                  color: location.pathname === '/admin/user-management' ? 'common.white' : 'text.secondary',
                  transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                  '&:hover': { color: orange[500] },
                }}
              >
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText
                primary="User Management"
                sx={{
                  opacity: isEffectivelyOpen ? 1 : 0,
                  transition: theme.transitions.create('opacity', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                  whiteSpace: 'nowrap',
                }}
                primaryTypographyProps={{
                  color: location.pathname === '/admin/user-management' ? 'common.white' : 'text.primary',
                }}
              />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: currentWidth },
        flexShrink: { sm: 0 },
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: expandedWidth,
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common?.white,
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          zIndex: theme.zIndex.drawer + 3,
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: currentWidth,
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common?.white,
            borderRight: `1px solid ${theme.palette.divider}`,
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
