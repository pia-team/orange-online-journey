import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { updateContactInformation, selectContactInformation } from '../../../features/quote/quoteFormSlice';
import type { AppDispatch } from '../../../store';

const ContactPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(1),
  position: 'relative',
}));

const EditButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const ContactField = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

interface ContactSectionProps {
  title: string;
  fields: { label: string; value: string }[];
  onEdit: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ title, fields, onEdit }) => {
  return (
    <ContactPaper elevation={1}>
      <EditButton onClick={onEdit}>
        <EditIcon />
      </EditButton>
      
      <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
        {title}
      </Typography>
      
      {fields.map((field) => (
        <ContactField key={field.label} variant="body1">
          <strong>{field.label}</strong>: {field.value}
        </ContactField>
      ))}
    </ContactPaper>
  );
};

const ContactInformationForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const contactInfo = useSelector(selectContactInformation);

  // For demonstration purposes, we'll just trigger an edit mode that would open a dialog
  // In a real app, you'd implement an edit dialog or in-place editing
  const handleEdit = (section: string) => {
    alert(`Edit ${section} information. In a real app, this would open an edit dialog.`);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'normal' }}>
        Contact Information
      </Typography>

      <Grid container spacing={4}>
        {/* Commercial Contact */}
        <Grid item xs={12} md={6}>
          <ContactSection
            title="Commercial Contact"
            fields={[
              { label: 'Name', value: contactInfo.commercialContact.name },
              { label: 'Title', value: contactInfo.commercialContact.title || '' },
              { label: 'Company', value: contactInfo.commercialContact.company || '' },
              { label: 'Address', value: contactInfo.commercialContact.address || '' },
              { label: 'Phone', value: contactInfo.commercialContact.phone || '' },
              { label: 'Email', value: contactInfo.commercialContact.email },
            ]}
            onEdit={() => handleEdit('Commercial Contact')}
          />
        </Grid>

        {/* Technical Contact */}
        <Grid item xs={12} md={6}>
          <ContactSection
            title="Technical Contact"
            fields={[
              { label: 'Name', value: contactInfo.technicalContact.name },
              { label: 'Title', value: contactInfo.technicalContact.title || '' },
              { label: 'Company', value: contactInfo.technicalContact.company || '' },
              { label: 'Address', value: contactInfo.technicalContact.address || '' },
              { label: 'Phone', value: contactInfo.technicalContact.phone || '' },
              { label: 'Email', value: contactInfo.technicalContact.email },
            ]}
            onEdit={() => handleEdit('Technical Contact')}
          />
        </Grid>

        {/* Billing Contact */}
        <Grid item xs={12} md={6}>
          <ContactSection
            title="Billing Contact"
            fields={[
              { label: 'Name', value: contactInfo.billingContact.name },
              { label: 'Title', value: contactInfo.billingContact.title || '' },
              { label: 'Company', value: contactInfo.billingContact.company || '' },
              { label: 'Address', value: contactInfo.billingContact.address || '' },
              { label: 'Phone', value: contactInfo.billingContact.phone || '' },
              { label: 'Email', value: contactInfo.billingContact.email },
              { label: 'VAT Number', value: '123456789' },
              { label: 'Receipent Email', value: 'billing@example.com' },
            ]}
            onEdit={() => handleEdit('Billing Contact')}
          />
        </Grid>

        {/* Fault Management */}
        <Grid item xs={12} md={6}>
          <ContactSection
            title="Fault Management (NOC)"
            fields={[
              { label: 'Group Name', value: contactInfo.faultManagement.groupName },
              { label: 'Name', value: contactInfo.faultManagement.name },
              { label: 'Phone', value: contactInfo.faultManagement.phone },
              { label: 'Email', value: contactInfo.faultManagement.email },
              { label: 'Working Hours', value: contactInfo.faultManagement.workingHours },
            ]}
            onEdit={() => handleEdit('Fault Management')}
          />
        </Grid>

        {/* Data Protection Contact */}
        <Grid item xs={12} md={6}>
          <ContactSection
            title="Data Protection Contact"
            fields={[
              { label: 'Name', value: contactInfo.dataProtectionContact.name },
              { label: 'Phone', value: contactInfo.dataProtectionContact.phone },
              { label: 'Email', value: contactInfo.dataProtectionContact.email },
            ]}
            onEdit={() => handleEdit('Data Protection Contact')}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactInformationForm;
