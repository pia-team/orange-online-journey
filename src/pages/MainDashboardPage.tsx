import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, CircularProgress } from '@mui/material';
import {
  DashboardHeader,
  QuotesTable,
  TablePagination
} from '../components/dashboard';
import type { AppDispatch } from '../store';
import { fetchQuotesAsync } from '../features/quotes/quotesSlice';
import { 
  selectQuoteTableItems, 
  selectQuotesStatus, 
  selectQuotesError, 
  selectQuotesTotalCount 
} from '../features/quotes/quotesSelectors';

const MainDashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const quotes = useSelector(selectQuoteTableItems);
  const status = useSelector(selectQuotesStatus);
  const error = useSelector(selectQuotesError);
  const totalCount = useSelector(selectQuotesTotalCount);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const loading = status === 'loading';

  useEffect(() => {
    dispatch(fetchQuotesAsync({
      limit: rowsPerPage,
      offset: page * rowsPerPage,
      sort: '-createdDate',
      depth: 2,
      expand: 'relatedParty.account'
    }));
  }, [dispatch, page, rowsPerPage]);


  const handleViewDetails = (quoteId: string) => {
    console.log(`View details for quote: ${quoteId}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  return (
    <Container sx={{ mt: 4, position: 'relative' }}>
      <Box sx={{ 
        backgroundColor: '#ffffff',
        p: 3,
        borderRadius: 1,
        boxShadow: 1
      }}>
        {/* Header with company name and title */}
        <DashboardHeader companyName="Orange" title="Quotes" titleColor="#212121" companyNameColor="#f57c00" />
        
       
        
        {/* Loading indicator or error message */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}
        
        {error && (
          <Box sx={{ 
            p: 2, 
            bgcolor: '#ffebee', 
            color: '#c62828', 
            borderRadius: 1,
            my: 2
          }}>
            {error}
          </Box>
        )}
        
        {/* Quotes Table */}
        {!loading && !error && (
          <QuotesTable 
            quotes={quotes} 
            onViewDetails={handleViewDetails} 
          />
        )}
        
        {/* Table Pagination */}
        <TablePagination 
          count={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Box>
    </Container>
  );
};

export default MainDashboardPage;
