import { useKeycloak } from '@react-keycloak/web';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import MainDashboardPage from './pages/MainDashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import CreateQuotePage from './pages/CreateQuotePage';
import { Box, CircularProgress, Typography } from '@mui/material';
import './App.css';

function App() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return (
      <Box 
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh', 
          backgroundColor: '#2d323e',
          color: 'white'
        }}
      >
        <CircularProgress color="primary" />
        <Typography sx={{ mt: 2 }}>Initializing Keycloak and loading application...</Typography>
      </Box>
    );
  }

  if (keycloak.authenticated) {
    return (
      <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainDashboardPage />} />
        <Route path="quote/create" element={<CreateQuotePage />} />
        <Route path="quote/edit/:id" element={<CreateQuotePage />} />
        <Route path="admin/user-management" element={<UserManagementPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
    );
  }
  

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh', 
        backgroundColor: '#2d323e', 
        color: 'white' 
      }}
    >
      <Typography>Please login to continue. You might be redirected shortly.</Typography>
    </Box>
  );
}

export default App;

