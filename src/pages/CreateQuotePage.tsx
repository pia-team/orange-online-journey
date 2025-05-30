import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Paper, Button, CircularProgress, Typography, Grid, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import QuoteStepper from '../components/quote/QuoteStepper';
import ServiceNeedsForm from '../components/quote/steps/ServiceNeedsForm';
import TechnicalFeasibilityForm from '../components/quote/steps/TechnicalFeasibilityForm';
import CommercialProposalForm from '../components/quote/steps/CommercialProposalForm';
import ContactInformationForm from '../components/quote/steps/ContactInformationForm';
import SummarySignatureForm from '../components/quote/steps/SummarySignatureForm';
import { 
  selectCurrentStep, 
  nextStep, 
  prevStep, 
  resetForm,
  initializeFromQuote
} from '../features/quote/quoteFormSlice';
import { fetchQuoteByIdAsync } from '../features/quotes/quotesSlice';
import type { AppDispatch, RootState } from '../store';

const CreateQuotePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const activeStep = useSelector(selectCurrentStep);
  const { selectedQuote, selectedQuoteStatus, selectedQuoteError } = useSelector((state: RootState) => state.quotes);
  
  const [formInitialized, setFormInitialized] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchQuoteByIdAsync({ 
        id, 
        depth: 2, 
        expand: 'relatedParty.account' 
      }));
    }

    return () => {
      dispatch(resetForm());
    };
  }, [dispatch, id]);
  
  useEffect(() => {
    if (id && selectedQuote && selectedQuoteStatus === 'succeeded' && !formInitialized) {
      dispatch(initializeFromQuote(selectedQuote));
      setFormInitialized(true);
    }
  }, [id, selectedQuote, selectedQuoteStatus, formInitialized, dispatch]);

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  const handleCancel = () => {
    navigate('/');
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <ServiceNeedsForm />
      case 1:
        return <TechnicalFeasibilityForm />
      case 2:
        return <CommercialProposalForm />
      case 3:
        return <ContactInformationForm />
      case 4:
        return <SummarySignatureForm />
      default:
        return <div>Unknown step</div>
    }
  };

  if (id && selectedQuoteStatus === 'loading') {
    return (
      <Container maxWidth={false} sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading quote data...</Typography>
      </Container>
    );
  }

  if (id && selectedQuoteStatus === 'failed') {
    return (
      <Container maxWidth={false} sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 1, backgroundColor: '#ffffff' }}>
          <Typography variant="h6" color="error">Error loading quote: {selectedQuoteError}</Typography>
          <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>Return to Dashboard</Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} sx={{ mt: 4 }}>  
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 1,
          backgroundColor: '#ffffff',
        }}
      >
        {/* Stepper Component */}
        <QuoteStepper activeStep={activeStep} />
        
        {/* Step Content */}
        <Box sx={{ mt: 2, mb: 4 }}>
          {renderStepContent()}
        </Box>
        
        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 3 }}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{ mr: 1 }}
          >
            Cancel My Order
          </Button>
          
          <Box>
            {activeStep > 0 && (
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )}
            
            <Button
              variant="contained"
              onClick={activeStep === 4 ? () => alert('Order submitted!') : handleNext}
              sx={{ 
                bgcolor: '#f57c00',
                '&:hover': {
                  bgcolor: '#ef6c00',
                }
              }}
            >
              {activeStep === 4 ? 'I sign my order' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateQuotePage;
