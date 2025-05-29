import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
  resetForm
} from '../features/quote/quoteFormSlice';
import type { AppDispatch } from '../store';

const CreateQuotePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const activeStep = useSelector(selectCurrentStep);

  useEffect(() => {
    // Reset form when component unmounts
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch]);

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  const handleCancel = () => {
    // Navigate back to dashboard
    navigate('/');
  };

  // Render the current step form based on the activeStep
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
