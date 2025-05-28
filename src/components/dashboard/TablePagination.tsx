import React from 'react';
import {
  Box,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import {
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon
} from '@mui/icons-material';

interface TablePaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    onRowsPerPageChange(event.target.value as number);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'flex-end', 
      p: 2, 
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e0e0e0'
    }}>
      <Typography variant="body2" sx={{ mr: 2, color: '#616161' }}>
        Items per page:
      </Typography>
      <FormControl size="small" sx={{ minWidth: 70, mr: 4 }}>
        <Select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          displayEmpty
          sx={{
            color: '#212121',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#bdbdbd',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#757575',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#757575',
            },
            '.MuiSvgIcon-root': {
              color: '#757575',
            }
          }}
          inputProps={{ 'aria-label': 'rows per page' }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      
      <Typography variant="body2" sx={{ mr: 2, color: '#616161' }}>
        {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, count)} of {count}
      </Typography>
      
      <Box sx={{ display: 'flex' }}>
        <IconButton
          onClick={() => onPageChange(0)}
          disabled={page === 0}
          aria-label="first page"
          sx={{ 
            color: page === 0 ? '#bdbdbd' : '#757575',
            '&:hover': { backgroundColor: '#f5f5f5' }
          }}
        >
          <FirstPageIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          aria-label="previous page"
          sx={{ 
            color: page === 0 ? '#bdbdbd' : '#757575',
            '&:hover': { backgroundColor: '#f5f5f5' }
          }}
        >
          <KeyboardArrowLeft fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
          aria-label="next page"
          sx={{ 
            color: page >= totalPages - 1 ? '#bdbdbd' : '#757575',
            '&:hover': { backgroundColor: '#f5f5f5' }
          }}
        >
          <KeyboardArrowRight fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => onPageChange(totalPages - 1)}
          disabled={page >= totalPages - 1}
          aria-label="last page"
          sx={{ 
            color: page >= totalPages - 1 ? '#bdbdbd' : '#757575',
            '&:hover': { backgroundColor: '#f5f5f5' }
          }}
        >
          <LastPageIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TablePagination;
