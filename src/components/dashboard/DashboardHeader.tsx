import React from 'react';
import { Box, Typography } from '@mui/material';
import CreateQuoteButton from './CreateQuoteButton';

interface DashboardHeaderProps {
  companyName: string;
  title: string;
  titleColor?: string;
  companyNameColor?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  companyName, 
  title, 
  titleColor = '#000000', 
  companyNameColor = '#f57c00' 
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography 
        variant="h5" 
        component="h2" 
        sx={{ 
          fontFamily: 'cursive', 
          color: companyNameColor,
          mb: 2 
        }}
      >
        {companyName}
      </Typography>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          fontWeight: 'bold',
          color: titleColor
        }}
      >
        {title}
      </Typography>
       {/* Create Quote Button (positioned absolutely) */}
       <CreateQuoteButton />
    </Box>
  );
};

export default DashboardHeader;
