import React from 'react';
import { Box, Stepper, Step, StepLabel, styled } from '@mui/material';

const steps = [
  { label: 'Service Needs', key: 'service-needs' },
  { label: 'Technical Feasibility', key: 'technical-feasibility' },
  { label: 'Commercial Proposal', key: 'commercial-proposal' },
  { label: 'Contact Information', key: 'contact-information' },
  { label: 'Summary & Signature', key: 'summary-signature' },
];

const StyledStepper = styled(Stepper)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiStepConnector-line': {
    borderColor: theme.palette.primary.main,
  },
  '& .MuiStepIcon-root': {
    color: theme.palette.grey[300],
    '&.Mui-active, &.Mui-completed': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiStepLabel-label': {
    color: theme.palette.text.primary, // Ensure text is always visible
    fontWeight: 500,
    '&.Mui-active': {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
    '&.Mui-completed': {
      color: theme.palette.success.main,
    }
  }
}));

interface QuoteStepperProps {
  activeStep: number;
}

const QuoteStepper: React.FC<QuoteStepperProps> = ({ activeStep }) => {
  return (
    <Box sx={{ width: '100%', mb: 5 }}>
      <StyledStepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          
          return (
            <Step key={step.key} {...stepProps}>
              <StepLabel {...labelProps}>
                {step.label}
              </StepLabel>
            </Step>
          );
        })}
      </StyledStepper>
    </Box>
  );
};

export default QuoteStepper;
export { steps };
