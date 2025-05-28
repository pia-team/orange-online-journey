import React from 'react';
import { Box, Typography } from '@mui/material';

const UserManagementPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ color: (theme) => theme.palette.common.black, mb: 2 }}>
        User Management
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.common.black }}>
        User management interface will be built here.
      </Typography>
    </Box>
  );
};

export default UserManagementPage;
