import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { orange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

interface CreateQuoteButtonProps {
  onClick?: () => void;
}

const CreateQuoteButton: React.FC<CreateQuoteButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Navigate to the create quote page
      navigate('/quote/create');
    }
  };
  
  return (
    <Tooltip title="Create Quote" placement="left">
      <Fab 
        color="primary" 
        aria-label="create quote" 
        onClick={handleClick}
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
