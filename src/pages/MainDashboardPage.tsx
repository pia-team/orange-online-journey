import React from 'react';
import { Box, Typography } from '@mui/material';

const MainDashboardPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ color: (theme) => theme.palette.common.black, mb: 2 }}>
        Main Page
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.common.black }}>
        Welcome to the main dashboard. Content for this page will be added here.
      </Typography>
    </Box>
  );
};

export default MainDashboardPage;
