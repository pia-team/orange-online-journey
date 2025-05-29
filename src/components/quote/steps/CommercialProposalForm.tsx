import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  Button,
  Divider,
  colors,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {
  updateCommercialProposal,
  selectCommercialProposal,
} from '../../../features/quote/quoteFormSlice';
import type { AppDispatch } from '../../../store';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  '&.header': {
    fontWeight: 'bold',
  },
  '&.package-header': {
    textAlign: 'center',
    fontWeight: 'bold',
  },
}));

const PackageHeader = styled(Box)(({ theme, backgroundColor, color }: { theme: any; backgroundColor?: string; color?: string }) => ({
  padding: theme.spacing(1),
  backgroundColor: backgroundColor || theme.palette.grey[300],
  color: color || theme.palette.text.primary,
  borderRadius: theme.spacing(0.5),
  textAlign: 'center',
  fontWeight: 'bold',
}));

const PricingOption = styled(Paper)(
  ({ theme, isSelected }: { theme: any; isSelected: boolean }) => ({
    padding: theme.spacing(2),
    border: isSelected
      ? `2px solid ${theme.palette.warning.main}`
      : `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      borderColor: theme.palette.warning.main,
    },
  })
);

const packages = [
  {
    type: 'Essential',
    features: {
      capacityBaseline: 'Standard',
      classOfService: 'Standard',
      availabilityRateSla: true,
      guaranteedTimeToRestore: false,
      click: true,
      customerServiceCenter: true,
      globalServiceManagement: false,
      proactivePenaltyManagement: false,
    },
    prices: [
      { period: 36, value: 13.0 },
      { period: 24, value: 13.0 },
      { period: 12, value: 14.0 },
      { period: 0, value: 15.0 },
    ],
  },
  {
    type: 'Dynamic',
    backgroundColor: '#a5a5a5',
    features: {
      capacityBaseline: 'Premium',
      classOfService: 'Premium',
      availabilityRateSla: true,
      guaranteedTimeToRestore: true,
      click: true,
      customerServiceCenter: true,
      globalServiceManagement: true,
      proactivePenaltyManagement: false,
    },
    prices: [
      { period: 36, value: 15.0 },
      { period: 24, value: 16.0 },
      { period: 12, value: 17.0 },
      { period: 0, value: 18.0 },
    ],
  },
  {
    type: 'Intense',
    backgroundColor: '#555555',
    color: '#ffffff',
    features: {
      capacityBaseline: 'Premium',
      classOfService: 'Premium',
      availabilityRateSla: true,
      guaranteedTimeToRestore: true,
      click: true,
      customerServiceCenter: true,
      globalServiceManagement: true,
      proactivePenaltyManagement: true,
    },
    prices: [
      { period: 36, value: 18.0 },
      { period: 24, value: 19.0 },
      { period: 12, value: 20.0 },
      { period: 0, value: 21.0 },
    ],
  },
];

const featureLabels = {
  capacityBaseline: 'Capacity and Baseline Services',
  classOfService: 'Class of Service',
  availabilityRateSla: 'Availability Rate SLA',
  guaranteedTimeToRestore: 'Guaranteed Time to Restore (GTR)',
  click: 'Click',
  customerServiceCenter: 'Customer Service Center',
  globalServiceManagement: 'Global Service Management',
  proactivePenaltyManagement: 'Proactive Penalty Management',
};

const CommercialProposalForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const commercialData = useSelector(selectCommercialProposal);

  const handlePackageChange = (packageType: 'Essential' | 'Dynamic' | 'Intense') => {
    const selectedPackage = packages.find((p) => p.type === packageType);
    if (selectedPackage) {
      dispatch(
        updateCommercialProposal({
          selectedPackage: {
            ...commercialData.selectedPackage,
            type: packageType,
          },
        })
      );
    }
  };

  const handlePeriodChange = (period: 36 | 24 | 12 | 0) => {
    const selectedPackage = packages.find((p) => p.type === commercialData.selectedPackage.type);
    if (selectedPackage) {
      const priceInfo = selectedPackage.prices.find((p) => p.period === period);
      if (priceInfo) {
        dispatch(
          updateCommercialProposal({
            selectedPackage: {
              ...commercialData.selectedPackage,
              period,
              price: priceInfo.value,
            },
          })
        );
      }
    }
  };

  const isPackageSelected = (packageType: string) => {
    return commercialData.selectedPackage.type === packageType;
  };

  const isPeriodSelected = (period: number) => {
    return commercialData.selectedPackage.period === period;
  };

  return (
    <Box>
      <Typography variant='h4' component='h1' sx={{ mb: 3, fontWeight: 'normal' }}>
        Commercial Proposal
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          backgroundColor: '#e8f5e9',
          borderRadius: 2,
          width: '50%',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Summary Table */}
          <Grid container spacing={1}>
            {/* End A */}
            <Grid item xs={2} sx={{ fontWeight: 'bold', pr: 2 }}>
              <Typography variant='subtitle2' color='primary'>
                End A:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='body2'>Public site, PARIS LAB 3</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                60 RUE DES ARCHIVES, 75003 PARIS 03, France
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ width: '100%' }} />
            </Grid>
            {/* End B */}
            <Grid item xs={2} sx={{ fontWeight: 'bold', pr: 2 }}>
              <Typography variant='subtitle2' color='primary'>
                End B:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='body2'>Public site, PARIS LAB 1</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                17 RUE LECOEUR, ABIDJAN, Ivory Coast
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ width: '100%' }} />
            </Grid>
            {/* Bandwidth */}
            <Grid item xs={2} sx={{ fontWeight: 'bold', pr: 2 }}>
              <Typography variant='subtitle2' color='primary'>
                Bandwidth:
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='body2'>8 Mbps</Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Grid container xs={8}>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5' component='h2' sx={{ mb: 3 }}>
          Offer
        </Typography>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell className='header'>Feature</StyledTableCell>
                {packages.map((pkg) => (
                  <StyledTableCell key={pkg.type} className='package-header'>
                    <PackageHeader backgroundColor={pkg.backgroundColor} color={pkg.color}>{pkg.type}</PackageHeader>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(featureLabels).map(([key, label]) => (
                <TableRow key={key}>
                  <StyledTableCell>{label}</StyledTableCell>
                  {packages.map((pkg) => {
                    const feature = pkg.features[key as keyof typeof pkg.features];
                    return (
                      <StyledTableCell key={`${pkg.type}-${key}`} align='center'>
                        {typeof feature === 'boolean' ? (
                          feature ? (
                            <CheckCircleOutlineIcon sx={{ color: 'orange' }} />
                          ) : (
                            <RadioButtonUncheckedIcon sx={{ color: 'grey.400' }} />
                          )
                        ) : (
                          feature
                        )}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              ))}
              <TableRow>
                <StyledTableCell sx={{ fontWeight: 'bold' }}>Price</StyledTableCell>
                {packages.map((pkg) => (
                  <StyledTableCell key={`${pkg.type}-price`} align='center'>
                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                      From
                    </Typography>
                    <Typography variant='h6' sx={{ color: 'orange', fontWeight: 'bold' }}>
                      {pkg.prices[0].value.toFixed(2)} €/month
                    </Typography>
                  </StyledTableCell>
                ))}
              </TableRow>
              <TableRow>
                <StyledTableCell>Choose only one*</StyledTableCell>
                {packages.map((pkg) => (
                  <StyledTableCell key={`${pkg.type}-select`} align='center'>
                    <Radio
                      checked={isPackageSelected(pkg.type)}
                      onChange={() =>
                        handlePackageChange(pkg.type as 'Essential' | 'Dynamic' | 'Intense')
                      }
                      sx={{ color: 'orange', '&.Mui-checked': { color: 'orange' } }}
                    />
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      </Grid>
      

      <Box sx={{ mb: 5 }}>
        <Typography variant='h5' component='h2' sx={{ mb: 3 }}>
          Pricing
        </Typography>
        <Typography variant='body1' sx={{ mb: 2 }}>
          Please select the commitment type that suits you best.
        </Typography>
        <Typography variant='caption' sx={{ display: 'block', mb: 3 }}>
          Please note that all prices are exclusive of tax.
        </Typography>

        <Grid container spacing={2}>
          <Grid container spacing={2} xs={8} wrap='nowrap'>
            {/* Period seçeneklerini içeren Grid'ler */}
            {[36, 24, 12, 0].map((period) => (
              <Grid item xs={12} key={period}>
                <PricingOption
                  isSelected={isPeriodSelected(period)}
                  onClick={() => handlePeriodChange(period as 36 | 24 | 12 | 0)}
                >
                  <Typography variant='h6' sx={{ mb: 1 }}>
                    {period > 0 ? `${period} Months (*)` : 'No Commitment'}
                  </Typography>
                  <Typography variant='h5' sx={{ color: 'orange', fontWeight: 'bold' }}>
                    {commercialData.selectedPackage.price.toFixed(2)} €
                  </Typography>
                  <Typography variant='body2'>/month</Typography>
                </PricingOption>
              </Grid>
            ))}

            {/* Other Charges bloğu */}
            <Grid item xs={12}>
              
              <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant='h6' sx={{ mb: 2 }}>
                Other charges
              </Typography>
                  <Grid item xs={12}>
                    <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                      Installation fee (NRC)
                    </Typography>
                    <Grid container>
                      <Grid item xs={4}>
                        <Typography variant='body2'>End A:</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography color='primary' variant='body2'>{commercialData.installationFee.toFixed(2)} €</Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={4}>
                        <Typography variant='body2'>End B:</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography color='primary' variant='body2'>{commercialData.installationFee.toFixed(2)} €</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                      Cross connect charges
                    </Typography>
                    {Object.entries(commercialData.recurringCharges).map(([key, value]) => (
                      <Grid container>
                      <Grid item xs={4}>
                        <Typography variant='body2'>{key}:</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography color='primary' variant='body2'>{value.toFixed(2)} € /month</Typography>
                      </Grid>
                    </Grid>
                    ))}
                  </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant='outlined'
          sx={{
            borderColor: 'orange',
            color: 'orange',
            borderRadius: '20px',
            '&:hover': {
              borderColor: 'orange',
              backgroundColor: 'rgba(255, 152, 0, 0.08)',
            },
          }}
        >
          Save my proposal
        </Button>
      </Box>
    </Box>
  );
};

export default CommercialProposalForm;
