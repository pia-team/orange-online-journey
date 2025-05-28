import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectWelcomeMessage } from '../dashboardSlice';

const MainDashboardPage: React.FC = () => {
  const welcomeMessage = useSelector(selectWelcomeMessage);

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ color: (theme) => theme.palette.common.black, mb: 2 }}>
        Main Page
      </Typography>
      <Typography sx={{ color: (theme) => theme.palette.common.black }}>
        {welcomeMessage}
      </Typography>
    </Box>
  );
};

export default MainDashboardPage;
