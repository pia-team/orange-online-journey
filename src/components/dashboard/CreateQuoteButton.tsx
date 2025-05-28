import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { orange } from '@mui/material/colors';

interface CreateQuoteButtonProps {
  onClick?: () => void;
}

const CreateQuoteButton: React.FC<CreateQuoteButtonProps> = ({ onClick }) => {
  return (
    <Tooltip title="Create Quote" placement="left">
      <Fab 
        color="primary" 
        aria-label="create quote" 
        onClick={onClick}
        sx={{ 
          position: 'absolute',
          top: 40,
          right: 40,
          bgcolor: orange[500],
        }}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default CreateQuoteButton;
