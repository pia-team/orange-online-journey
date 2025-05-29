import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import { updateRequestedDate, selectTechnicalFeasibility, selectCommercialProposal, selectContactInformation, selectRequestedDate } from '../../../features/quote/quoteFormSlice';
import type { AppDispatch } from '../../../store';

const SummarySection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(1),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const InfoText = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.info.light,
  color: theme.palette.info.dark,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  marginTop: theme.spacing(3),
}));

const DetailRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(1),
  '& .label': {
    fontWeight: 'bold',
    width: '180px',
  },
}));

const EndpointBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <DetailRow>
    <Box className="label">{label}:</Box>
    <Box>{value}</Box>
  </DetailRow>
);

const SummarySignatureForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const technicalData = useSelector(selectTechnicalFeasibility);
  const commercialData = useSelector(selectCommercialProposal);
  const contactInfo = useSelector(selectContactInformation);
  const requestedDate = useSelector(selectRequestedDate);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateRequestedDate({
      date: e.target.value
    }));
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'normal' }}>
        Summary & Signature
      </Typography>

      <SummarySection elevation={1}>
        <SectionTitle variant="h5" component="h2">
          Order Details
        </SectionTitle>

        <Grid container spacing={4}>
          {/* End A Information */}
          <Grid item xs={12} md={6}>
            <EndpointBox>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ width: 30, height: 20, bgcolor: '#0055A4', mr: 1 }} />
                <Typography variant="h6" component="h3">
                  End A - {technicalData.endA.location}
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Physical address:</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                60 RUE DES ARCHIVES
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                75003 PARIS 03
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                FRANCE
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Interface Type:</strong> {technicalData.endA.capacity}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Status:</strong> New
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {technicalData.endA.crossConnect ? "✓ Cross connect included" : ""}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>VLAN number:</strong> {technicalData.endA.vlanNumber}
                </Typography>
              </Box>
            </EndpointBox>
          </Grid>

          {/* End B Information */}
          <Grid item xs={12} md={6}>
            <EndpointBox>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ width: 30, height: 20, bgcolor: '#FF883E', mr: 1 }} />
                <Typography variant="h6" component="h3">
                  End B - {technicalData.endB.location}
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Physical address:</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                17 RUE LECOEUR
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                ABIDJAN
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                IVORY COAST
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Interface Type:</strong> {technicalData.endB.capacity}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Status:</strong> Existing
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {technicalData.endB.crossConnect ? "✓ Cross connect included" : ""}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>VLAN number:</strong> {technicalData.endB.vlanNumber}
                </Typography>
              </Box>
            </EndpointBox>
          </Grid>

          {/* Charges */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              Charges
            </Typography>
            
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Monthly fee (all prices are exclusive of tax):</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {commercialData.selectedPackage.price.toFixed(2)} €/month
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Commitment period:</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {commercialData.selectedPackage.period} {commercialData.selectedPackage.period > 0 ? 'months' : 'No commitment'}
              </Typography>
            </Box>
          </Grid>

          {/* Offer */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              Offer
            </Typography>
            
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {commercialData.selectedPackage.type}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </SummarySection>

      <SummarySection elevation={1}>
        <SectionTitle variant="h5" component="h2">
          Contact Information
        </SectionTitle>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              My contact information
            </Typography>
            
            <DetailItem
              label="Commercial contact"
              value={contactInfo.commercialContact.name}
            />
            <DetailItem
              label="Technical contact"
              value={contactInfo.technicalContact.name}
            />
            <DetailItem
              label="Data protection contact"
              value={contactInfo.dataProtectionContact.name}
            />
            <DetailItem
              label="Fault management (NOC)"
              value={contactInfo.faultManagement.groupName}
            />
            <DetailItem
              label="Billing contact"
              value={contactInfo.billingContact.name}
            />
          </Grid>
        </Grid>
      </SummarySection>

      <SummarySection elevation={1}>
        <SectionTitle variant="h5" component="h2">
          Requested Date
        </SectionTitle>

        <Typography variant="body2" sx={{ mb: 3 }}>
          Note that a period of 15 working days from the receipt of the Letter Of Authorization (LOA) must be taken into account.
        </Typography>

        <Box sx={{ maxWidth: 200 }}>
          <TextField
            type="date"
            value={requestedDate.date}
            onChange={handleDateChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <InfoText>
          <InfoIcon sx={{ marginRight: 1 }} />
          <Typography variant="body2">
            You can confirm this order by clicking on "I sign". If you don't want to confirm it today, you can temporarily save it. This order will be valid for 7 days and will remain accessible from your order list.
          </Typography>
        </InfoText>
      </SummarySection>
    </Box>
  );
};

export default SummarySignatureForm;
