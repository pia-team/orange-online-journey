import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Chip,
  CircularProgress,
  Tooltip,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import QuoteDetailSidebar from './QuoteDetailSidebar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
}));

interface Quote {
  id: string;
  name: string;
  state: string;
  quoteDate: string;
  customer: string;
  amount: number;
  currency: string;
  endALocation?: string;
  endBLocation?: string;
  bandwidth?: string;
}

interface Product {
  id: string;
  product: {
    name: string;
    productSpecification?: {
      name: string;
    };
    productTerm?: [
      {
        name: string;
      }
    ];
  };
  quoteItemPrice?: [
    {
      priceType: string;
      price: {
        dutyFreeAmount: {
          value: number;
          unit: string;
        };
      };
      priceAlteration?: [
        {
          price: {
            dutyFreeAmount: {
              value: number;
              unit: string;
            };
          };
        }
      ];
    }
  ];
  bandwidth?: string;
  popA?: string;
  popB?: string;
}

const mockQuotes: Quote[] = [
  {
    id: '1',
    name: 'Quote for Orange Business Network',
    state: 'In Progress',
    quoteDate: '2025-04-15',
    customer: 'TOULOUSE INC-1',
    amount: 15000,
    currency: 'EUR',
    endALocation: 'Paris',
    endBLocation: 'Lyon',
    bandwidth: '100 Mbps'
  },
  {
    id: '2',
    name: 'Datacenter Connectivity Quote',
    state: 'Approved',
    quoteDate: '2025-04-10',
    customer: 'MARSEILLE SA',
    amount: 24500,
    currency: 'EUR',
    endALocation: 'Marseille',
    endBLocation: 'Nice',
    bandwidth: '1 Gbps'
  },
  {
    id: '3',
    name: 'Enterprise Network Expansion',
    state: 'Pending',
    quoteDate: '2025-04-05',
    customer: 'LYON TECH',
    amount: 18750,
    currency: 'EUR',
    endALocation: 'Lyon',
    endBLocation: 'Grenoble',
    bandwidth: '500 Mbps'
  },
];

const mockProducts: Product[] = [
  {
    id: '101',
    product: {
      name: 'Business VPN',
      productSpecification: {
        name: 'Premium Connectivity'
      },
      productTerm: [
        {
          name: '36 Months'
        }
      ]
    },
    quoteItemPrice: [
      {
        priceType: 'Monthly',
        price: {
          dutyFreeAmount: {
            value: 1250,
            unit: 'EUR'
          }
        }
      }
    ],
    bandwidth: '100 Mbps',
    popA: 'Paris',
    popB: 'Lyon'
  },
  {
    id: '102',
    product: {
      name: 'Security Gateway',
      productSpecification: {
        name: 'Advanced Security'
      },
      productTerm: [
        {
          name: '36 Months'
        }
      ]
    },
    quoteItemPrice: [
      {
        priceType: 'One-time',
        price: {
          dutyFreeAmount: {
            value: 3500,
            unit: 'EUR'
          }
        },
        priceAlteration: [
          {
            price: {
              dutyFreeAmount: {
                value: 2800,
                unit: 'EUR'
              }
            }
          }
        ]
      }
    ]
  }
];

const mockOpportunity = {
  id: '100',
  state: 'In Progress',
  relatedParty: [
    {
      '@type': 'RelatedParty',
      name: 'HENRI BEY'
    },
    {
      '@type': 'Customer',
      name: 'TOULOUSE INC-1'
    }
  ],
  billingAccount: [
    {
      '@baseType': 'BillingAccount',
      characteristic: [
        {
          name: 'billingAffiliate',
          value: 'BA-20250425-002'
        }
      ]
    }
  ],
  note: [
    { name: 'owner', text: 'N/A' },
    { name: 'deputyOwner', text: 'N/A' },
    { name: 'topic', text: 'N/A' },
    { name: 'estCloseDate', text: '2025-06-30' },
    { name: 'estBillingDate', text: '2025-07-15' },
    { name: 'onlineOrder', text: 'N/A' },
    { name: 'mustWin', text: 'true' },
    { name: 'largeProjects', text: 'true' },
    { name: 'weeklyCommerce', text: 'true' },
    { name: 'returnBusiness', text: 'true' },
    { name: 'atRisk', text: 'true' },
    { name: 'raiseToManagement', text: 'N/A' },
    { name: 'offnet', text: 'N/A' },
    { name: 'bsmAsked', text: 'N/A' },
    { name: 'priorityLevel', text: 'N/A' },
    { name: 'opportunityType', text: 'N/A' },
    { name: 'businessType', text: 'N/A' },
    { name: 'carrierCode', text: 'N/A' },
    { name: 'currency', text: 'EUR' },
    { name: 'broker', text: 'N/A' },
    { name: 'distributionChannel', text: 'N/A' },
    { name: 'contractTechReference', text: 'N/A' },
  ],
  description: 'Network connectivity between Paris and Lyon offices with additional security services'
};

const QuoteList: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setQuotes(mockQuotes);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const handleViewDetail = (quote: Quote) => {
    console.log('View detail for quote:', quote);
    setSelectedQuote(quote);
    setProducts(mockProducts);
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleAddNewProduct = () => {
    console.log('Add new product');
  };

  const handleCreateQuote = () => {
    console.log('Create new quote');
  };

  const getStatusChipColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'in progress':
        return 'primary';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Quotes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateQuote}
        >
          Create Quote
        </Button>
      </Box>

      <StyledCard>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Total Quotes</Typography>
              <Typography variant="h6">{quotes.length}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" color="text.secondary">In Progress</Typography>
              <Typography variant="h6">{quotes.filter(q => q.state === 'In Progress').length}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Approved</Typography>
              <Typography variant="h6">{quotes.filter(q => q.state === 'Approved').length}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Pending</Typography>
              <Typography variant="h6">{quotes.filter(q => q.state === 'Pending').length}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Quote ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Customer</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>End A</StyledTableCell>
                <StyledTableCell>End B</StyledTableCell>
                <StyledTableCell>Bandwidth</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotes.map((quote) => (
                <StyledTableRow key={quote.id}>
                  <TableCell>{quote.id}</TableCell>
                  <TableCell>{quote.name}</TableCell>
                  <TableCell>
                    <Chip 
                      label={quote.state} 
                      color={getStatusChipColor(quote.state) as any} 
                      size="small" 
                      variant="outlined" 
                    />
                  </TableCell>
                  <TableCell>{new Date(quote.quoteDate).toLocaleDateString()}</TableCell>
                  <TableCell>{quote.customer}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: quote.currency }).format(quote.amount)}
                  </TableCell>
                  <TableCell>{quote.endALocation || 'N/A'}</TableCell>
                  <TableCell>{quote.endBLocation || 'N/A'}</TableCell>
                  <TableCell>{quote.bandwidth || 'N/A'}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton size="small" onClick={() => handleViewDetail(quote)} color="primary">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Quote">
                      <IconButton size="small" color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Quote">
                      <IconButton size="small" color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
      <QuoteDetailSidebar
        open={sidebarOpen}
        onClose={handleCloseSidebar}
        opportunity={mockOpportunity}
        products={products}
        addNewProduct={handleAddNewProduct}
      />
    </Box>
  );
};

export default QuoteList;
