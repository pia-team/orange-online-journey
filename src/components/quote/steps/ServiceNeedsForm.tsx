import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { 
  updateServiceNeeds, 
  selectServiceNeeds
} from '../../../features/quote/quoteFormSlice';
import {
  fetchPOPLocations,
  type POPLocation,
  selectPOPLocations,
  selectGeographicSiteStatus
} from '../../../features/geographicSite/geographicSiteSlice';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';
import { type AppDispatch } from '../../../store';
import InputLabel from '@mui/material/InputLabel';

// Icons

// Define bandwidth options
const bandwidthOptions = ['2M', '4M', '10M', '100M', '1G', '10G'];

const EndpointSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(5),
}));

const ServiceNeedsForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const serviceNeeds = useSelector(selectServiceNeeds);
  
  // Input değerlerini takip etmek için state'ler
  const [endAInputValue, setEndAInputValue] = useState('');
  const [endBInputValue, setEndBInputValue] = useState('');
  const [endASearchTerm, setEndASearchTerm] = useState('');
  const [endBSearchTerm, setEndBSearchTerm] = useState('');
  
  // Redux state'lerini al
  const locations = useSelector(selectPOPLocations);
  const status = useSelector(selectGeographicSiteStatus);
  const loading = status === 'loading';
  
  // End A ve End B için ayrı location listelerini filtrele
  const endAOptions = endASearchTerm ? locations : [];
  const endBOptions = endBSearchTerm ? locations : [];

  // Get current selected locations from Redux store
  const selectedEndA = serviceNeeds.endALocation || null;
  const selectedEndB = serviceNeeds.endBLocation || null;

  // Handle searching for End A locations
  useEffect(() => {
    if (endAInputValue.length >= 2) {
      const timeoutId = setTimeout(() => {
        setEndASearchTerm(endAInputValue);
        dispatch(fetchPOPLocations(endAInputValue));
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [endAInputValue, dispatch]);

  // Handle searching for End B locations
  useEffect(() => {
    if (endBInputValue.length >= 2) {
      const timeoutId = setTimeout(() => {
        setEndBSearchTerm(endBInputValue);
        dispatch(fetchPOPLocations(endBInputValue));
      }, 300);
      
      return () => clearTimeout(timeoutId);
    }
  }, [endBInputValue, dispatch]);

  useEffect(() => {
    console.log(serviceNeeds);
    
  }, [serviceNeeds]); 

  // Handler for bandwidth selection
  const handleBandwidthChange = (endpoint: 'endBandwidth', value: string) => {
    dispatch(updateServiceNeeds({ [endpoint]: value }));
  };

  // Handler for POP location selection
  const handlePOPChange = (endpoint: 'endA' | 'endB', location: POPLocation | null) => {
    // Update Redux state with the selected POP location directly
    dispatch(updateServiceNeeds({ 
      [`${endpoint}Location`]: location
    }));
  };

  return (
    <Box>
      <Typography variant='h4' component='h1' sx={{ mb: 3, fontWeight: 'normal' }}>
        Service Needs
      </Typography>

      <EndpointSection>
        <Typography variant="h6" component="h2" sx={{ mt: 1, mb: 1, fontWeight: 'bold'}}>
            End A
        </Typography>

        <Grid container spacing={2} direction='row' alignItems='flex-start' wrap='wrap'>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={10}>
              <Box>
                <Typography variant='body1' sx={{ mb: 1 }}>
                  Orange POP
                </Typography>
                <Autocomplete
                  id='end-a-pop'
                  options={endAOptions}
                  getOptionLabel={(option) => `${option.id}, ${option.description}, ${option.name}`}
                  loading={loading}
                  value={selectedEndA}
                  onChange={(_, newValue) => handlePOPChange('endA', newValue)}
                  onInputChange={(_, newInputValue) => setEndAInputValue(newInputValue)}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder='Search POP location'
                      variant='outlined'
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loading ? <CircularProgress color='inherit' size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e0e0e0' },
                          '&:hover fieldset': { borderColor: '#f57c00' },
                          '&.Mui-focused fieldset': { borderColor: '#f57c00' },
                        },
                      }}
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      <Box>
                        <Typography variant='body1'>{option.id}</Typography>
                        <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                          {option.description}, {option.name}
                        </Typography>
                      </Box>
                    </li>
                  )}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={10}>
            <Typography variant='body1' sx={{ mb: 1 }}>
                Bandwidth
                </Typography>
              <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                <FormControl fullWidth>
                  <InputLabel id='end-a-bandwidth-label'>Bandwidth</InputLabel>
                  <Select
                    labelId='end-a-bandwidth-label'
                    id='end-a-bandwidth'
                    value={serviceNeeds.endBandwidth || ''}
                    label='Bandwidth'
                    onChange={(e) => handleBandwidthChange('endBandwidth', e.target.value)}
                  >
                    {bandwidthOptions.map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </EndpointSection>

      <EndpointSection>
      <Typography variant="h6" component="h2" sx={{ mt: 1, mb: 1, fontWeight: 'bold'}}>
            End B
        </Typography>

        <Grid container spacing={2} direction='row' alignItems='flex-start' wrap='wrap'>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={10}>
              <Box>
                <Typography variant='body1' sx={{ mb: 1 }}>
                  Orange POP
                </Typography>
                <Autocomplete
                  id='end-b-pop'
                  options={endBOptions}
                  getOptionLabel={(option) => `${option.id}, ${option.description}, ${option.name}`}
                  loading={loading}
                  value={selectedEndB}
                  onChange={(_, newValue) => handlePOPChange('endB', newValue)}
                  onInputChange={(_, newInputValue) => setEndBInputValue(newInputValue)}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder='Search POP location'
                      variant='outlined'
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loading ? <CircularProgress color='inherit' size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e0e0e0' },
                          '&:hover fieldset': { borderColor: '#f57c00' },
                          '&.Mui-focused fieldset': { borderColor: '#f57c00' },
                        },
                      }}
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      <Box>
                        <Typography variant='body1'>{option.id}</Typography>
                        <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                          {option.description}, {option.name}
                        </Typography>
                      </Box>
                    </li>
                  )}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </EndpointSection>
    </Box>
  );
};

export default ServiceNeedsForm;
