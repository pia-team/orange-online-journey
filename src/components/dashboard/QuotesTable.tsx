import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Chip,
  Tooltip
} from '@mui/material';
import QuoteDetailSidebar from './QuoteDetailSidebar';

export interface QuoteTableItem {
  id: string;
  state: string;
  offerName: string;
  creationDate: string;
  estimatedDate: string;
  owner: string;
  quote: any;
}

interface QuotesTableProps {
  quotes: QuoteTableItem[];
  onViewDetails: (quoteId: string) => void;
  isLoading?: boolean;
}

const QuotesTable: React.FC<QuotesTableProps> = ({ quotes }) => {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Record<string, unknown> | null>(null);

  const handleViewDetail = (quote: QuoteTableItem) => {
    setSelectedQuote(quote.quote as Record<string, unknown>);
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleAddNewProduct = () => {
    console.log('Add new product for quote:', selectedQuote);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', mb: 2, backgroundColor: '#ffffff' }}>
        <Table sx={{ minWidth: 650 }} aria-label="quotes table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#212121' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#212121' }}>Offer Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#212121' }}>Creation Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#212121' }}>Estimated Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#212121' }}>Owner</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: '#212121' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow key={quote.id} sx={{ 
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: '#ffffff',
                '&:hover': { backgroundColor: '#f5f5f5' }
              }}>
                <TableCell>
                  <Chip 
                    label={quote.state} 
                    size="small"
                    sx={{ 
                      backgroundColor: quote.state.toLowerCase() === 'inprogress' 
                        ? '#fff3e0' 
                        : '#eeeeee',
                      color: '#212121',
                      fontWeight: 'medium',
                      border: quote.state.toLowerCase() === 'inprogress' ? '1px solid #ffb74d' : '1px solid #bdbdbd'
                    }} 
                  />
                </TableCell>
                <TableCell sx={{ color: '#212121' }}>
                  <Tooltip title={quote.offerName} arrow>
                    <Typography noWrap sx={{ maxWidth: 180, display: 'block', color: '#212121' }}>
                      {quote.offerName}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ color: '#212121' }}>{quote.creationDate}</TableCell>
                <TableCell sx={{ color: '#212121' }}>{quote.estimatedDate}</TableCell>
                <TableCell sx={{ color: '#212121' }}>
                  <Tooltip title={quote.owner} arrow>
                    <Typography noWrap sx={{ maxWidth: 120, display: 'block', color: '#212121' }}>
                      {quote.owner}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewDetail(quote)}
                    sx={{ 
                      textTransform: 'none',
                      borderColor: '#bdbdbd',
                      color: '#212121'
                    }}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Quote Detail Sidebar */}
      <QuoteDetailSidebar 
        open={sidebarOpen}
        quote={selectedQuote}
        onClose={handleCloseSidebar}
        onAddNewProduct={handleAddNewProduct}
      />
    </>
  );
};

export default QuotesTable;
