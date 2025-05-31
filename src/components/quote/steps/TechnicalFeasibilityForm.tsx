import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
  Checkbox,
  InputLabel,
  Divider,
  colors,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { updateTechnicalFeasibility, selectTechnicalFeasibility, selectServiceNeeds } from '../../../features/quote/quoteFormSlice';
import { 
  fetchEndAInterfaces, 
  fetchEndBInterfaces,
  selectEndAInterfaces,
  selectEndBInterfaces,
  selectEndAStatus,
  selectEndBStatus
} from '../../../features/gini/giniSlice';
import { selectCustomerCodeRCE } from '../../../features/customer/customerSelectors';
import type { AppDispatch } from '../../../store';

// Define interface for service characteristic
interface ServiceCharacteristic {
  name: string;
  value: string;
}

// Define interface for service
interface Service {
  serviceCharacteristic: ServiceCharacteristic[];
}

// Define interface for service qualification item
interface ServiceQualificationItem {
  service: Service;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: '#f5f5f5',
  borderRadius: theme.spacing(1),
}));

const EndpointSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  border: '1px solid #e0e0e0',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
}));

const EndpointHeader = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '8px',
  backgroundColor: colors.orange[500],
}));

const AddressBlock = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: '#f9f9f9',
  borderRadius: theme.spacing(1),
}));

const CapacityBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.warning.main}`,
  borderRadius: theme.spacing(0.5),
  padding: theme.spacing(2),
  width: '250px',
  textAlign: 'center',
  marginTop: theme.spacing(2),
  '& .capacity-value': {
    fontSize: '24px',
    fontWeight: 'bold',
    color: theme.palette.warning.main,
  },
  '& .capacity-label': {
    fontSize: '12px',
    color: theme.palette.text.secondary,
  }
}));

// BandwidthBox component styled for bandwidth display
const BandwidthBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  borderRadius: theme.spacing(1),
  borderTop: '1px solid #e0e0e0',
  borderBottom: '1px solid #e0e0e0',
}));

const TechnicalFeasibilityForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const technicalData = useSelector(selectTechnicalFeasibility);
  const serviceNeeds = useSelector(selectServiceNeeds);
  const customerCodeRCE = useSelector(selectCustomerCodeRCE);
  const endAInterfaces = useSelector(selectEndAInterfaces);
  const endBInterfaces = useSelector(selectEndBInterfaces);
  const endAStatus = useSelector(selectEndAStatus);
  const endBStatus = useSelector(selectEndBStatus);
  
  useEffect(() => {
    if (serviceNeeds.endALocation?.id) {
      // POP ID formatını düzenle
      const popId = serviceNeeds.endALocation.id.includes('-') ? 
        serviceNeeds.endALocation.id.split('-')[2] : 
        serviceNeeds.endALocation.id;
      
      dispatch(fetchEndAInterfaces({
        code_rce: customerCodeRCE || 'xxx',
        number_intf: 0,
        pop_id: popId,
        service_type: 'L2VPN',
        origin: 'DNEXT'
      }));

      dispatch(fetchEndAInterfaces({
        code_rce: customerCodeRCE || 'xxx',
        number_intf: 1,
        pop_id: popId,
        type_intf: '123123',
        bw_service: '22222',
        service_type: 'L2VPN',
        origin: 'DNEXT'
      }));

      const place = serviceNeeds.endALocation.place?.[0] || {};
      dispatch(updateTechnicalFeasibility({
        endA: {
          ...technicalData.endA,
          location: serviceNeeds.endALocation.name,
          place: {
            address: place.streetName || '',
            city: `${place.postcode || ''} ${place.city || ''}`.trim(),
            country: place.country || ''
          }
        }
      }));
    }
  }, [dispatch, serviceNeeds.endALocation]);
  
  // Update technicalFeasibility form with endAInterfaces data when fetched
  useEffect(() => {
    if (endAInterfaces && endAInterfaces.length > 0) {
      // Find the interface with number_intf value of '0'
      const targetInterface = endAInterfaces.find((intf: ServiceQualificationItem) => 
        intf?.service?.serviceCharacteristic?.find((char: ServiceCharacteristic) => 
          char.name === 'number_intf' && char.value === '0'
        )
      );
      const targetInterface2 = endAInterfaces.find((intf: ServiceQualificationItem) => 
        intf?.service?.serviceCharacteristic?.find((char: ServiceCharacteristic) => 
          char.name === 'number_intf' && char.value === '1'
        )
      );
      
      // Extract capacity characteristics from targetInterface2 (number_intf='1')
      let l2CapacityMax = '';
      let l3CapacityMax = '';
      
      if (targetInterface2 && targetInterface2.service && targetInterface2.service.serviceCharacteristic) {
        const capacityCharacteristics: Record<string, string> = {};
        
        targetInterface2.service.serviceCharacteristic.forEach((char: ServiceCharacteristic) => {
          if (char.name && char.value !== undefined) {
            capacityCharacteristics[char.name] = char.value;
          }
        });
        
        l2CapacityMax = capacityCharacteristics['l2_capacity_max'] || '';
        l3CapacityMax = capacityCharacteristics['l3_capacity_max'] || '';
      }
      
      if (targetInterface && targetInterface.service && targetInterface.service.serviceCharacteristic) {
        // Map characteristics to form fields
        const characteristics: Record<string, string> = {};
        
        targetInterface.service.serviceCharacteristic.forEach((char: ServiceCharacteristic) => {
          if (char.name && char.value !== undefined) {
            characteristics[char.name] = char.value;
          }
        });
        
        // Update technicalFeasibility form with mapped characteristics
        dispatch(updateTechnicalFeasibility({
          endA: {
            ...technicalData.endA,
            connectionMode: characteristics['vlan_id'].split(',')[0] ? 'VLAN' : 'PORT',
            vlanNumber: characteristics['vlan_id'].split(',')[0] || technicalData.endA.vlanNumber,
            interface: characteristics['interface'] || technicalData.endA.interface,
            router: characteristics['router'] || technicalData.endA.router,
            bw_avail: characteristics['bw_avail'] || technicalData.endA.bw_avail,
            bw_max: characteristics['bw_max'] || technicalData.endA.bw_max,
            l2_capacity_max: l2CapacityMax || technicalData.endA.l2_capacity_max,
            l3_capacity_max: l3CapacityMax || technicalData.endA.l3_capacity_max,
            connectionModeNewInterface: characteristics['vlan_id'].split(',')[1] ? 'VLAN' : 'PORT',
            vlanNumberNewInterface: characteristics['vlan_id'].split(',')[1] || technicalData.endA.vlanNumberNewInterface,
            // Update other fields as needed
          }
        }));
      }
    }
  }, [endAInterfaces, dispatch]);
  
  useEffect(() => {
    if (serviceNeeds.endBLocation?.id) {
      // POP ID formatını düzenle
      const popId = serviceNeeds.endBLocation.id.includes('-') ? 
        serviceNeeds.endBLocation.id.split('-')[2] : 
        serviceNeeds.endBLocation.id;
      
      dispatch(fetchEndBInterfaces({
        code_rce: customerCodeRCE || 'xxx',
        number_intf: 0,
        pop_id: popId, 
        service_type: 'L2VPN',
        origin: 'DNEXT'
      }));

      dispatch(fetchEndBInterfaces({
        code_rce: customerCodeRCE || 'xxx',
        number_intf: 1,
        pop_id: popId,
        type_intf: '123123',
        bw_service: '22222',
        service_type: 'L2VPN',
        origin: 'DNEXT'
      }));
      
      const place = serviceNeeds.endBLocation.place?.[0] || {};
      dispatch(updateTechnicalFeasibility({
        endB: {
          ...technicalData.endB,
          location: serviceNeeds.endBLocation.name,
          place: {
            address: place.streetName || '',
            city: `${place.postcode || ''} ${place.city || ''}`.trim(),
            country: place.country || ''
          }
        }
      }));
    }
  }, [dispatch, serviceNeeds.endBLocation]);
  
  // Update technicalFeasibility form with endBInterfaces data when fetched
  useEffect(() => {
    if (endBInterfaces && endBInterfaces.length > 0) {
      // Find the interface with number_intf value of '0'
      const targetInterface = endBInterfaces.find((intf: ServiceQualificationItem) => 
        intf?.service?.serviceCharacteristic?.find((char: ServiceCharacteristic) => 
          char.name === 'number_intf' && char.value === '0'
        )
      );
      
      // Find the interface with number_intf value of '1' for capacity values
      const targetInterface2 = endBInterfaces.find((intf: ServiceQualificationItem) => 
        intf?.service?.serviceCharacteristic?.find((char: ServiceCharacteristic) => 
          char.name === 'number_intf' && char.value === '1'
        )
      );
      
      // Extract capacity characteristics from targetInterface2 (number_intf='1')
      let l2CapacityMax = '';
      let l3CapacityMax = '';
      
      if (targetInterface2 && targetInterface2.service && targetInterface2.service.serviceCharacteristic) {
        const capacityCharacteristics: Record<string, string> = {};
        
        targetInterface2.service.serviceCharacteristic.forEach((char: ServiceCharacteristic) => {
          if (char.name && char.value !== undefined) {
            capacityCharacteristics[char.name] = char.value;
          }
        });
        
        l2CapacityMax = capacityCharacteristics['l2_capacity_max'] || '';
        l3CapacityMax = capacityCharacteristics['l3_capacity_max'] || '';
      }
      
      if (targetInterface && targetInterface.service && targetInterface.service.serviceCharacteristic) {
        // Map characteristics to form fields
        const characteristics: Record<string, string> = {};
        
        targetInterface.service.serviceCharacteristic.forEach((char: ServiceCharacteristic) => {
          if (char.name && char.value !== undefined) {
            characteristics[char.name] = char.value;
          }
        });
        
        // Update technicalFeasibility form with mapped characteristics
        dispatch(updateTechnicalFeasibility({
          endB: {
            ...technicalData.endB,
            connectionMode: characteristics['vlan_id'].split(',')[0] ? 'VLAN' : 'PORT',
            vlanNumber: characteristics['vlan_id'].split(',')[0] || technicalData.endB.vlanNumber,
            interface: characteristics['interface'] || technicalData.endB.interface,
            router: characteristics['router'] || technicalData.endB.router,
            bw_avail: characteristics['bw_avail'] || technicalData.endB.bw_avail,
            bw_max: characteristics['bw_max'] || technicalData.endB.bw_max,
            l2_capacity_max: l2CapacityMax || technicalData.endB.l2_capacity_max,
            l3_capacity_max: l3CapacityMax || technicalData.endB.l3_capacity_max,
            connectionModeNewInterface: characteristics['vlan_id'].split(',')[1] ? 'VLAN' : 'PORT',
            vlanNumberNewInterface: characteristics['vlan_id'].split(',')[1] || technicalData.endB.vlanNumberNewInterface,
          }
        }));
      }
    }
  }, [endBInterfaces, dispatch]);

  const handleConnectionModeChange = (endpoint: 'endA' | 'endB', mode: 'VLAN' | 'PORT') => {
    dispatch(updateTechnicalFeasibility({
      [endpoint]: {
        ...technicalData[endpoint],
        connectionMode: mode,
      }
    }));
  };

  const handleCrossConnectChange = (endpoint: 'endA' | 'endB', checked: boolean) => {
    dispatch(updateTechnicalFeasibility({
      [endpoint]: {
        ...technicalData[endpoint],
        crossConnect: checked,
      }
    }));
  };

  const handleVlanNumberChange = (endpoint: 'endA' | 'endB', value: string) => {
    dispatch(updateTechnicalFeasibility({
      [endpoint]: {
        ...technicalData[endpoint],
        vlanNumber: value,
      }
    }));
  };
  
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'normal' }}>
        Technical Feasibility
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
              <Typography variant="subtitle2" color="primary">End A:</Typography>
            </Grid>
            <Grid item xs={10}>
              {serviceNeeds.endALocation ? (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{serviceNeeds.endALocation.name}</Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                    {serviceNeeds.endALocation?.place[0]?.streetName}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                    {serviceNeeds.endALocation?.place[0]?.postcode + ' ' + serviceNeeds.endALocation?.place[0]?.city}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                    {serviceNeeds.endALocation?.place[0]?.country}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No End A location selected
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
            <Divider sx={{width: '100%' }} />
            </Grid>
            {/* End B */}
            <Grid item xs={2} sx={{ fontWeight: 'bold', pr: 2 }}>
              <Typography variant="subtitle2" color="primary">End B:</Typography>
            </Grid>
            <Grid item xs={10}>
            {serviceNeeds.endBLocation ? (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{serviceNeeds?.endBLocation?.name}</Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                    {serviceNeeds?.endBLocation?.place[0]?.streetName}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                    {serviceNeeds?.endBLocation?.place[0]?.postcode + ' ' + serviceNeeds?.endBLocation?.place[0]?.city}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                    {serviceNeeds?.endBLocation?.place[0]?.country}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No End B location selected
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
            <Divider sx={{width: '100%' }} />
            </Grid>
            {/* Bandwidth */}
            <Grid item xs={2} sx={{ fontWeight: 'bold', pr: 2 }}>
              <Typography variant="subtitle2" color="primary">Bandwidth:</Typography>
            </Grid>
            <Grid item xs={10}>
              {serviceNeeds.endBandwidth ? (
                <Typography variant="body2">
                  {serviceNeeds.endBandwidth && `${serviceNeeds.endBandwidth}`}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No bandwidth selected
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Grid container spacing={6}>
        {/* END A Section */}
        <Grid item xs={12} md={6}>
          <EndpointSection>
            <EndpointHeader />
            <Typography variant="h6" component="h2" sx={{ mt: 1, mb: 1, fontWeight: 'bold', pl: 1 }}>
              End A
            </Typography>
            
              {serviceNeeds.endALocation && (
                            <AddressBlock>

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {serviceNeeds?.endALocation?.name}
              </Typography>
              <Typography variant="body2">
                {serviceNeeds?.endALocation?.description}
              </Typography>
              </AddressBlock>
              )}
              
            
            <Typography variant="subtitle1" sx={{ mb: 1, mt: 3 }}>
              Available existing interface(s):
            </Typography>
            
            <StyledPaper elevation={0}>
              <Typography variant="body2">
                You can re-use an existing interface, or add new one.
                Connector type and module type will be discussed at delivery
              </Typography>
              
              {endAStatus === 'loading' && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                  <CircularProgress color='warning' size={24} />
                </Box>
              )}
              
              {endAStatus === 'failed' && (
                <Box sx={{ mt: 2, p: 2, border: '1px solid #ffcccc', borderRadius: 1, bgcolor: '#fff8f8' }}>
                  <Typography variant="body2" color='error'>
                    Failed to load interface data
                  </Typography>
                </Box>
              )}
              
              {endAStatus === 'succeeded' && endAInterfaces.length === 0 && (
                <Box sx={{ mt: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography variant="body2" color='text.secondary'>
                    No existing interfaces found
                  </Typography>
                </Box>
              )}
              
              {endAStatus === 'succeeded' && (
                <Box sx={{ mt: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography variant="body2" fontWeight='bold'>
                    {technicalData.endA.interface || 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    {technicalData.endA.router || 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    {`${parseInt(technicalData.endA.bw_avail || '0') / 100}Gbps / ${parseInt(technicalData.endA.bw_max || '0') /100}Gbps`}
                  </Typography>
                </Box>
              )}

              
              {/* Fall back to static data if needed */}
              {endAStatus !== 'loading' && endAStatus !== 'succeeded' && (
                <Box sx={{ mt: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography variant="body2">
                    {technicalData.endA?.interfaceDetails?.interfaceId}
                  </Typography>
                  <Typography variant="body2">
                    {technicalData.endA?.interfaceDetails?.portType}
                  </Typography>
                  <Typography variant="body2">
                    Availability: {technicalData.endA?.interfaceDetails?.availability}
                  </Typography>
                </Box>
              )}
            </StyledPaper>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Technical settings
              </Typography>
              
              <FormControl>
                <RadioGroup
                  value={technicalData.endA.connectionMode}
                  onChange={(e) => handleConnectionModeChange('endA', e.target.value as 'VLAN' | 'PORT')}
                  row
                >
                  <FormControlLabel
                    value="VLAN"
                    control={<Radio sx={{ color: 'orange', '&.Mui-checked': { color: 'orange' } }} />}
                    label="VLAN Mode"
                  />
                  <FormControlLabel
                    value="PORT"
                    control={<Radio sx={{ color: 'orange', '&.Mui-checked': { color: 'orange' } }} />}
                    label="Port Mode"
                  />
                </RadioGroup>
              </FormControl>
              
              {technicalData.endA.connectionMode === 'VLAN' && (
                <Box sx={{ mt: 2 }}>
                  <InputLabel htmlFor="vlan-number-a">VLAN number</InputLabel>
                  <TextField
                    id="vlan-number-a"
                    variant="outlined"
                    value={technicalData.endA?.vlanNumber}
                    onChange={(e) => handleVlanNumberChange('endA', e.target.value)}
                    size="small"
                    sx={{ width: 200 }}
                  />
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    You can choose between 2 and 4094
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ mt: 3 }}>
                <CapacityBox>
                  <div className="capacity-value">{technicalData.endA?.capacity}</div>
                  <div className="capacity-label">New TechSpecialBeam®</div>
                </CapacityBox>
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={technicalData.endA?.crossConnect}
                      onChange={(e) => handleCrossConnectChange('endA', e.target.checked)}
                      sx={{ color: 'orange', '&.Mui-checked': { color: 'orange' } }}
                    />
                  }
                  label="Add Cross-Connect Option"
                  sx={{ mt: 2 }}
                />
                <FormControl>
                <RadioGroup
                  value={technicalData.endA.connectionModeNewInterface}
                  onChange={(e) => handleConnectionModeChange('endA', e.target.value as 'VLAN' | 'PORT')}
                  row
                >
                  <FormControlLabel
                    value="VLAN"
                    control={<Radio sx={{ color: 'orange', '&.Mui-checked': { color: 'orange' } }} />}
                    label="VLAN Mode"
                  />
                  <FormControlLabel
                    value="PORT"
                    control={<Radio sx={{ color: 'orange', '&.Mui-checked': { color: 'orange' } }} />}
                    label="Port Mode"
                  />
                </RadioGroup>
              </FormControl>
              {technicalData.endA.connectionModeNewInterface === 'VLAN' && (
                <Box sx={{ mt: 2 }}>
                  <InputLabel htmlFor="vlan-number-new-a">VLAN number</InputLabel>
                  <TextField
                    id="vlan-number-new-a"
                    variant="outlined"
                    value={technicalData.endA?.vlanNumberNewInterface}
                    onChange={(e) => handleVlanNumberChange('endA', e.target.value)}
                    size="small"
                    sx={{ width: 200 }}
                  />
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    You can choose between 2 and 4094
                  </Typography>
                </Box>
              )}
              </Box>
            </Box>
          </EndpointSection>
        </Grid>
        
        {/* END B Section */}
        <Grid item xs={12} md={6}>
          <EndpointSection>
            <EndpointHeader />
            <Typography variant="h6" component="h2" sx={{ mt: 1, mb: 1, fontWeight: 'bold', pl: 1 }}>
              End B
            </Typography>
            
            {serviceNeeds.endBLocation && (
                            <AddressBlock>

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {serviceNeeds.endBLocation.name}
              </Typography>
              <Typography variant="body2">
                {serviceNeeds.endBLocation.place[0]?.streetName}
              </Typography>
              </AddressBlock>
              )}
            
            <Typography variant="subtitle1" sx={{ mb: 1, mt: 3 }}>
              Available existing interface(s):
            </Typography>
            
            <StyledPaper elevation={0}>
              <Typography variant="body2">
                You can re-use an existing interface, or add new one.
                Connector type and module type will be discussed at delivery
              </Typography>
              
              {endBStatus === 'loading' && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                  <CircularProgress color='warning' size={24} />
                </Box>
              )}
              
              {endBStatus === 'failed' && (
                <Box sx={{ mt: 2, p: 2, border: '1px solid #ffcccc', borderRadius: 1, bgcolor: '#fff8f8' }}>
                  <Typography variant="body2" color='error'>
                    Failed to load interface data
                  </Typography>
                </Box>
              )}
              
              {endBStatus === 'succeeded' && endBInterfaces.length === 0 && (
                <Box sx={{ mt: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography variant="body2" color='text.secondary'>
                    No existing interfaces found
                  </Typography>
                </Box>
              )}
              
              {endBStatus === 'succeeded' && (
                <Box sx={{ mt: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography variant="body2" fontWeight='bold'>
                    {technicalData.endB.interface || 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    {technicalData.endB.router || 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    {`${parseInt(technicalData.endB.bw_avail || '0') / 100}Gbps / ${parseInt(technicalData.endB.bw_max || '0') /100}Gbps`}
                  </Typography>
                </Box>
              )}
              
              {/* Fall back to static data if needed */}
              {endBStatus !== 'loading' && endBStatus !== 'succeeded' && (
                <Box sx={{ mt: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography variant="body2">
                    {technicalData.endB.interfaceDetails.interfaceId}
                  </Typography>
                  <Typography variant="body2">
                    {technicalData.endB.interfaceDetails.portType}
                  </Typography>
                  <Typography variant="body2">
                    Availability: {technicalData.endB.interfaceDetails.availability}
                  </Typography>
                </Box>
              )}
            </StyledPaper>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Technical settings
              </Typography>
              
              <FormControl>
                <RadioGroup
                  value={technicalData.endB.connectionMode}
                  onChange={(e) => handleConnectionModeChange('endB', e.target.value as 'VLAN' | 'PORT')}
                  row
                >
                  <FormControlLabel
                    value="VLAN"
                    control={<Radio sx={{ color: 'orange', '&.Mui-checked': { color: 'orange' } }} />}
                    label="VLAN Mode"
                  />
                  <FormControlLabel
                    value="PORT"
                    control={<Radio sx={{ color: 'orange', '&.Mui-checked': { color: 'orange' } }} />}
                    label="Port Mode"
                  />
                </RadioGroup>
              </FormControl>
              
              {technicalData.endB.connectionMode === 'VLAN' && (
                <Box sx={{ mt: 2 }}>
                  <InputLabel htmlFor="vlan-number-b">VLAN number</InputLabel>
                  <TextField
                    id="vlan-number-b"
                    variant="outlined"
                    value={technicalData.endB.vlanNumber}
                    onChange={(e) => handleVlanNumberChange('endB', e.target.value)}
                    size="small"
                    sx={{ width: 200 }}
                  />
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    You can choose between 2 and 4094
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ mt: 3 }}>
                <CapacityBox>
                  <div className="capacity-value">{technicalData.endB.capacity}</div>
                  <div className="capacity-label">New TechSpecialBeam®</div>
                </CapacityBox>
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={technicalData.endB.crossConnect}
                      onChange={(e) => handleCrossConnectChange('endB', e.target.checked)}
                      sx={{ color: 'orange', '&.Mui-checked': { color: 'orange' } }}
                    />
                  }
                  label="Add Cross-Connect Option"
                  sx={{ mt: 2 }}
                />
              </Box>
            </Box>
          </EndpointSection>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TechnicalFeasibilityForm;
