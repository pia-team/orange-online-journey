import React from 'react';
import {
  Drawer,
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem
} from '@mui/material';
import { MoreVert, Close, ShoppingCart } from '@mui/icons-material';
import { data } from 'react-router-dom';

// Define the sections and fields to display
export interface OpportunityField {
  field: string;
  titleKey: string;
  type: 'text' | 'date' | 'boolean' | 'number' | 'currency';
  isNote?: boolean;
  noteKey?: string;
  valueExtractor?: (data: Record<string, unknown> | null) => string | undefined;
}

export interface OpportunitySection {
  sectionTitleKey: string;
  fields: OpportunityField[];
}

export interface QuoteDetailSidebarProps {
  open: boolean;
  quote: Record<string, unknown> | null;
  onClose: () => void;
  onAddNewProduct: () => void;
}

const QuoteDetailSidebar: React.FC<QuoteDetailSidebarProps> = ({
  open,
  quote,
  onClose,
  onAddNewProduct
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleAddProduct = () => {
    onAddNewProduct();
    handleMenuClose();
  };

  // Use actual quote items from the selectedQuote object
  const productData = (quote?.quoteItem as Array<Record<string, unknown>>) || [];

  // Actual opportunity sections mapped from the image
  const opportunitySections: OpportunitySection[] = [
    {
      sectionTitleKey: 'HEADERS.KEY_OPPORTUNITY_INFORMATION',
      fields: [
        { field: 'owner', titleKey: 'HEADERS.OWNER', type: 'text', isNote: true, noteKey: 'owner' },
        { field: 'deputyOwner', titleKey: 'HEADERS.DEPUTY_OWNER', type: 'text', isNote: true, noteKey: 'deputyOwner' },
        // { field: 'id', titleKey: 'HEADERS.ID', type: 'text', isNote: false },
        { field: 'topic', titleKey: 'HEADERS.TOPIC', type: 'text', isNote: true, noteKey: 'topic'.toUpperCase() },
        {
          field: 'contact',
          titleKey: 'HEADERS.CONTACT',
          type: 'text',
          isNote: false,
          valueExtractor: (data: any) =>
            data?.relatedParty?.find((p: any) => p && p['@type'] === 'RelatedParty')?.name,
        },
        { field: 'account', titleKey: 'HEADERS.ACCOUNT', type: 'text', isNote: false,
          valueExtractor: (data: any) =>
            data?.relatedParty?.find((p: any) => p && p['@type'] === 'Customer')?.name,},
        { field: 'estCloseDate', titleKey: 'HEADERS.EST_CLOSE_DATE', type: 'date', isNote: true, noteKey: 'estCloseDate' },
        { field: 'estBillingDate', titleKey: 'HEADERS.EST_BILLING_DATE', type: 'date', isNote: true, noteKey: 'estBillingDate' },
        { field: 'state', titleKey: 'HEADERS.STATUS', type: 'text', isNote: false },
      ],
    },
    {
      sectionTitleKey: 'HEADERS.BUSINESS_LEVEL',
      fields: [
        { field: 'onlineOrder', titleKey: 'HEADERS.ONLINE_ORDER', type: 'boolean', isNote: true, noteKey: 'onlineOrder' },
        { field: 'mustWin', titleKey: 'HEADERS.MUST_WIN', type: 'boolean', isNote: true, noteKey: 'mustWin' },
        { field: 'largeProjects', titleKey: 'HEADERS.LARGE_PROJECTS', type: 'boolean', isNote: true, noteKey: 'largeProjects' },
        { field: 'weeklyCommerce', titleKey: 'HEADERS.WEEKLY_COMMERCE_COMMITEE', type: 'boolean', isNote: true, noteKey: 'weeklyCommerce' },
        { field: 'returnBusiness', titleKey: 'HEADERS.RETURN_BUSINESS', type: 'boolean', isNote: true, noteKey: 'returnBusiness' },
        { field: 'atRisk', titleKey: 'HEADERS.AT_RISK', type: 'boolean', isNote: true, noteKey: 'atRisk' },
        { field: 'raiseToManagement', titleKey: 'HEADERS.RAISE_TO_MANAGEMENT', type: 'boolean', isNote: true, noteKey: 'raiseToManagement' },
        { field: 'offnet', titleKey: 'HEADERS.OFFNET', type: 'boolean', isNote: true, noteKey: 'offnet' },
      ],
    },
    {
      sectionTitleKey: 'HEADERS.PRIORITY_SUPPORT',
      fields: [
        { field: 'bsmAsked', titleKey: 'HEADERS.BSM_ASKED', type: 'text', isNote: true, noteKey: 'bsmAsked' },
        { field: 'priorityLevel', titleKey: 'HEADERS.PRIORITY_LEVEL', type: 'text', isNote: true, noteKey: 'priorityLevel' }
      ],
    },
    {
      sectionTitleKey: 'HEADERS.BUSINESS_CATEGORIZATION',
      fields: [
        { field: 'opportunityType', titleKey: 'HEADERS.OPPORTUNITY_TYPE', type: 'text', isNote: true, noteKey: 'opportunityType' },
        { field: 'businessType', titleKey: 'HEADERS.BUSINESS_TYPE', type: 'text', isNote: true, noteKey: 'businessType' },
        { field: 'carrierCode', titleKey: 'HEADERS.CARRIER_CODE', type: 'text', isNote: true, noteKey: 'carrierCode' },
        {
          field: 'billingAffiliate',
          titleKey: 'HEADERS.BILLING_AFFILIATE',
          type: 'text',
          isNote: false,
          valueExtractor: (data: any) => 
            data?.billingAccount?.find((acc: any) => acc && acc?.['@baseType'] === 'BillingAccount')?.
          characteristic?.find((c: any) => c && c.name === 'billingAffiliate')?.value,
        },
        { field: 'currency', titleKey: 'HEADERS.CURRENCY', type: 'text', isNote: true, noteKey: 'currency' },
        { field: 'broker', titleKey: 'HEADERS.BROKER', type: 'text', isNote: true, noteKey: 'broker' },
        { field: 'distributionChannel', titleKey: 'HEADERS.DISTRUBUTION_CHANNEL', type: 'text', isNote: true, noteKey: 'distributionChannel' },
        { field: 'contractTechReference', titleKey: 'HEADERS.CONTRAT_TECH_REFERENCE', type: 'text', isNote: true, noteKey: 'contractTechReference' },
      ],
    },
    {
      sectionTitleKey: 'HEADERS.PIPE_DATA',
      fields: [
        { field: 'duration', titleKey: 'HEADERS.DURATION', type: 'text', isNote: true, noteKey: 'duration' }, 
        { field: 'estRevenueBase', titleKey: 'HEADERS.EST_REVENUE_BASE', type: 'currency', isNote: true, noteKey: 'estRevenueBase' },
        { field: 'probability', titleKey: 'HEADERS.PROBABILITY_PERCENT', type: 'number', isNote: true, noteKey: 'probability' },
        { field: 'weightedEstRevenue', titleKey: 'HEADERS.WEIGHTED_EST_REVENUE', type: 'currency', isNote: true, noteKey: 'weightedEstRevenue' },
        { field: 'calculationType', titleKey: 'HEADERS.CALCULATION_TYPE', type: 'text', isNote: true, noteKey: 'calculationType' },
        { field: 'currency', titleKey: 'HEADERS.CURRENCY', type: 'text', isNote: true, noteKey: 'currency' },
      ],
    },
    {
      sectionTitleKey: 'HEADERS.DEAL_DESCRIPTION',
      fields: [
        { field: 'description', titleKey: 'HEADERS.DESCRIPTION', type: 'text', isNote: false},
        { field: 'customerNeed', titleKey: 'HEADERS.CUSTOMER_NEED', type: 'text', isNote: true, noteKey: 'customerNeed' },
        { field: 'proposedSolution', titleKey: 'HEADERS.PROPOSED_SOLUTION', type: 'text', isNote: true, noteKey: 'proposedSolution' },
      ],
    },
    {
      sectionTitleKey: 'HEADERS.ACTION_PLAN_TITLE',
      fields: [
        { field: 'actionPlan', titleKey: 'HEADERS.ACTION_PLAN', type: 'text', isNote: true, noteKey: 'actionPlan' },
        { field: 'sourceCampaign1', titleKey: 'HEADERS.SOURCE_CAMPAIGN_1', type: 'text', isNote: true, noteKey: 'sourceCampaign1' },
        { field: 'sourceCampaign2', titleKey: 'HEADERS.SOURCE_CAMPAIGN_2', type: 'text', isNote: true, noteKey: 'sourceCampaign2' },
        { field: 'sourceCampaign3', titleKey: 'HEADERS.SOURCE_CAMPAIGN_3', type: 'text', isNote: true, noteKey: 'sourceCampaign3' },
      ],
    },
  ];

  // Function to get note text from an object based on a key
  const getNoteText = (data: any, key: string): string => {
    return data?.note?.find((x: any) => x?.id === key)?.text;
  };

  // Function to render field value based on type
  const renderFieldValue = (field: OpportunityField, data: Record<string, unknown> | null) => {
    if (field.valueExtractor) {
      return field.valueExtractor(data) || 'N/A';
    }

    // Default fallback value if no extractor is provided
    return field.noteKey || 'N/A';
  };

  // Product columns for reference
  // const productColumns = ['name', 'spec', 'term', 'price', 'priceType', 'bandwidth', 'popA', 'popB'];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '40%',
          boxSizing: 'border-box',
          boxShadow: '0px 8px 10px -5px rgba(0,0,0,0.2)',
        },
      }}
    >
      <div style={{ padding: '16px', height: '100%', overflow: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Typography variant="h5" component="h3">Opportunity Detail</Typography>
          <div style={{ display: 'flex' }}>
            <IconButton style={{ marginRight: '10px' }} onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleAddProduct}>
                <ShoppingCart fontSize="small" style={{ marginRight: '8px' }} />
                <span>Add New Product</span>
              </MenuItem>
            </Menu>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </div>
        </div>

        {/* Products Table */}
        {productData.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <Typography variant="h6" component="h3" style={{ marginBottom: '16px' }}>Products</Typography>
            <TableContainer component={Paper} style={{ marginBottom: '16px', boxShadow: 'none', border: '1px solid #e0e0e0' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Product Spec</TableCell>
                    <TableCell>Term</TableCell>
                    <TableCell>Price (excl. VAT)</TableCell>
                    <TableCell>Price Type</TableCell>
                    <TableCell>Bandwidth</TableCell>
                    <TableCell>POP A</TableCell>
                    <TableCell>POP B</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.product.name || 'N/A'}</TableCell>
                      <TableCell>{'N/A'}</TableCell>
                      <TableCell>{'N/A'}</TableCell>
                      <TableCell>{'N/A'}</TableCell>
                      <TableCell>{'N/A'}</TableCell>
                      <TableCell>{'N/A'}</TableCell>
                      <TableCell>{'N/A'}</TableCell>
                      <TableCell>{'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {/* Information Sections */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {opportunitySections.map((section, sectionIndex) => (
            <div key={sectionIndex} style={{ width: 'calc(50% - 16px)', marginBottom: '24px', backgroundColor: '#f8f9fa', borderRadius: '4px', padding: '16px' }}>
              <Typography variant="h6" component="h3" style={{ marginBottom: '16px', color: '#455a64' }}>
                {section.sectionTitleKey}
              </Typography>
              <List disablePadding>
                {section.fields.map((field, fieldIndex) => (
                  <React.Fragment key={fieldIndex}>
                    <ListItem disablePadding style={{ marginBottom: '8px' }}>
                      <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" style={{ color: '#78909c', fontWeight: 500 }}>
                            {field.titleKey}
                          </Typography>
                          {!field.isNote && (
                            <Typography variant="body2" style={{ color: '#37474f', fontWeight: 400 }}>
                              {renderFieldValue(field, quote)}
                            </Typography>
                          )}
                          {field.isNote && (
                            <Typography variant="body2" style={{ color: '#37474f', fontWeight: 400 }}>
                              {field.type === 'date' && (
                                (() => {
                                  const value = getNoteText(quote, field.noteKey || field.field);
                                  return value ? new Date(value).toLocaleDateString() : 'N/A';
                                })()
                              )}
                              {field.type === 'boolean' && (
                                (() => {
                                  const value = getNoteText(quote, field.noteKey || field.field);
                                  return value === 'true' ? 'Yes' : (value === 'false' ? 'No' : (value || 'N/A'));
                                })()
                              )}
                              {(field.type === 'text' || field.type === 'number' || field.type === 'currency') && (
                                (() => {
                                  const value = getNoteText(quote, field.noteKey || field.field);
                                  return value || 'N/A';
                                })()
                              )}
                            </Typography>
                          )}
                        </div>
                      </div>
                    </ListItem>
                    {fieldIndex < section.fields.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default QuoteDetailSidebar;
