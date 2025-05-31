import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Quote } from '../../types/QuoteManagement/Quote';


export interface POPLocation {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
}

interface GeographicSite {
  id: string;
  href: string;
  code: string;
  description: string;
  name: string;
  status: string;
  place: Place[];
  "@baseType": string;
  "@schemaLocation": string;
  "@type": string;
}

interface Place {
  id: string;
  href: string;
  name: string;
  "@baseType": string;
  "@schemaLocation": string;
  "@type": string;
  "@referredType": string;
  country: string;
  updatedBy: string;
  city: string;
  postcode: string;
  updatedDate: string;
  revision: number;
  streetName: string;
  createdDate: string;
  createdBy: string;
}



interface ServiceNeedsData {
  endBandwidth?: string;
  endALocation?: GeographicSite | null;
  endBLocation?: GeographicSite | null;
}

interface TechnicalInterfaceDetails {
  interfaceId: string;
  portType: string;
  availability: string;
  speed: string;
}

interface EndpointDetails {
  location: string;
  interfaceDetails: TechnicalInterfaceDetails;
  connectionMode: 'VLAN' | 'PORT';
  connectionModeNew: 'VLAN' | 'PORT';
  connectionModeNewInterface: 'VLAN' | 'PORT';
  vlanNumber: string;
  vlanNumberNewInterface: string;
  crossConnect: boolean;
  capacity: string;
  interface: string;
  router: string;
  bw_avail: string;
  bw_max: string;
  l2_capacity_max_value_display: string;
  l2_capacity_max_display: string;
  l2_capacity_max: string;
  l3_capacity_max: string;
  selectedInterface: 'existing' | 'new';
  place: {
    address: string;
    city: string;
    country: string;
  };
}

interface TechnicalFeasibilityData {
  endA: EndpointDetails;
  endB: EndpointDetails;
}

interface CommercialPackage {
  type: 'Essential' | 'Dynamic' | 'Intense';
  price: number;
  currency: string;
  period: 36 | 24 | 12 | 0;
}

interface CommercialProposalData {
  selectedPackage: CommercialPackage;
  installationFee: number;
  recurringCharges: Record<string, number>;
}

interface ContactInfo {
  name: string;
  title?: string;
  company?: string;
  address?: string;
  phone?: string;
  email: string;
}

interface FaultManagement {
  groupName: string;
  name: string;
  phone: string;
  email: string;
  workingHours: string;
}

interface DataProtectionContact {
  name: string;
  phone: string;
  email: string;
}

interface ContactInformationData {
  commercialContact: ContactInfo;
  technicalContact: ContactInfo;
  billingContact: ContactInfo;
  faultManagement: FaultManagement;
  dataProtectionContact: DataProtectionContact;
}

interface RequestedDateInfo {
  date: string;
}

interface StepValidation {
  isValid: boolean;
}

interface QuoteFormState {
  currentStep: number;
  serviceNeeds: ServiceNeedsData;
  technicalFeasibility: TechnicalFeasibilityData;
  commercialProposal: CommercialProposalData;
  contactInformation: ContactInformationData;
  requestedDate: RequestedDateInfo;
  submitting: boolean;
  error: string | null;
  formValidation: {
    serviceNeeds: StepValidation;
    technicalFeasibility: StepValidation;
    commercialProposal: StepValidation;
    contactInformation: StepValidation;
    summarySignature: StepValidation;
  };
}

const initialState: QuoteFormState = {
  currentStep: 0,
  serviceNeeds: {},
  formValidation: {
    serviceNeeds: { isValid: false },
    technicalFeasibility: { isValid: false },
    commercialProposal: { isValid: false },
    contactInformation: { isValid: false },
    summarySignature: { isValid: true },
  },
  technicalFeasibility: {
    endA: {
      location: '',
      interface: '',
      router: '',
      bw_avail: '',
      bw_max: '',
      l2_capacity_max: '',
      l3_capacity_max: '',
      l2_capacity_max_value_display: '',
      l2_capacity_max_display: '',
      interfaceDetails: {
        interfaceId: '',
        portType: '',
        availability: '',
        speed: '',
      },
      connectionModeNewInterface: 'PORT',
      connectionMode: 'PORT',
      connectionModeNew: 'PORT',
      vlanNumberNewInterface: '',
      vlanNumber: '',
      crossConnect: false,
      capacity: '',
      selectedInterface: 'existing',
      place: {
        address: '',
        city: '',
        country: '',
      },
    },
    endB: {
      location: '',
      interface: '',
      router: '',
      bw_avail: '',
      bw_max: '',
      l2_capacity_max: '',
      l2_capacity_max_value_display: '',
      l2_capacity_max_display: '',
      l3_capacity_max: '',
      interfaceDetails: {
        interfaceId: '',
        portType: '',
        availability: '',
        speed: '',
      },
      connectionModeNewInterface: 'PORT',
      connectionMode: 'PORT',
      connectionModeNew: 'PORT',
      vlanNumberNewInterface: '',
      vlanNumber: '',
      crossConnect: true,
      capacity: '',
      selectedInterface: 'existing',
      place: {
        address: '',
        city: '',
        country: '',
      },
    },
  },
  commercialProposal: {
    selectedPackage: {
      type: 'Essential',
      price: 13.00,
      currency: '€',
      period: 36,
    },
    installationFee: 30.00,
    recurringCharges: {
      'PortA': 5.00,
      'PortB': 10.00,
    },
  },
  contactInformation: {
    commercialContact: {
      name: 'JEAN DUPONT',
      title: 'Sales Manager',
      company: 'Orange Business',
      address: '123 Business Street, Paris',
      phone: '+33123456789',
      email: 'jean.dupont@orange.com',
    },
    technicalContact: {
      name: 'ANNE PERE',
      title: 'Network Engineer',
      company: 'Orange Business',
      address: '123 Business Street, Paris',
      phone: '+33123456788',
      email: 'anne.pere@orange.com',
    },
    billingContact: {
      name: 'JEANNE DUPONT',
      title: 'Finance Manager',
      company: 'Orange Business',
      address: '123 Business Street, Paris',
      phone: '+33123456787',
      email: 'jeanne.dupont@orange.com',
    },
    faultManagement: {
      groupName: 'NOC',
      name: 'NOC Team',
      phone: '+33123456786',
      email: 'noc@orange.com',
      workingHours: '24/7',
    },
    dataProtectionContact: {
      name: 'FABRICE DUPONT',
      phone: '+33123456785',
      email: 'fabrice.dupont@orange.com',
    },
  },
  requestedDate: {
    date: '2025-05-29',
  },
  submitting: false,
  error: null,
};

const quoteFormSlice = createSlice({
  name: 'quoteForm',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateServiceNeeds: (state, action: PayloadAction<Partial<ServiceNeedsData>>) => {
      state.serviceNeeds = { ...state.serviceNeeds, ...action.payload };
    },
    updateTechnicalFeasibility: (state, action: PayloadAction<Partial<TechnicalFeasibilityData>>) => {
      state.technicalFeasibility = { ...state.technicalFeasibility, ...action.payload };
    },
    updateCommercialProposal: (state, action: PayloadAction<Partial<CommercialProposalData>>) => {
      state.commercialProposal = { ...state.commercialProposal, ...action.payload };
    },
    updateContactInformation: (state, action: PayloadAction<Partial<ContactInformationData>>) => {
      state.contactInformation = { ...state.contactInformation, ...action.payload };
    },
    updateRequestedDate: (state, action: PayloadAction<RequestedDateInfo>) => {
      state.requestedDate = action.payload;
    },
    nextStep: (state) => {
      let isCurrentStepValid = false;
      
      switch(state.currentStep) {
        case 0: 
          isCurrentStepValid = state.formValidation.serviceNeeds.isValid;
          break;
        case 1:
          isCurrentStepValid = state.formValidation.technicalFeasibility.isValid;
          break;
        case 2:
          isCurrentStepValid = state.formValidation.commercialProposal.isValid;
          break;
        case 3:
          isCurrentStepValid = state.formValidation.contactInformation.isValid;
          break;
        case 4:
          isCurrentStepValid = state.formValidation.summarySignature.isValid;
          break;
        default:
          isCurrentStepValid = false;
      }
      
      if (isCurrentStepValid) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    resetForm: () => initialState,
    submitForm: (state) => {
      state.submitting = true;
      state.error = null;
    },
    submitFormSuccess: (state) => {
      state.submitting = false;
    },
    submitFormFailure: (state, action: PayloadAction<string>) => {
      state.submitting = false;
      state.error = action.payload;
    },
    setFormValidState: (state, action: PayloadAction<{ step: number; isValid: boolean }>) => {
      const { step, isValid } = action.payload;
      switch (step) {
        case 0:
          state.formValidation.serviceNeeds.isValid = isValid;
          break;
        case 1:
          state.formValidation.technicalFeasibility.isValid = isValid;
          break;
        case 2:
          state.formValidation.commercialProposal.isValid = isValid;
          break;
        case 3:
          state.formValidation.contactInformation.isValid = isValid;
          break;
        case 4:
          state.formValidation.summarySignature.isValid = isValid;
          break;
        default:
          break;
      }
    },
    initializeFromQuote: (state, action: PayloadAction<Quote>) => {
      const quote = action.payload;
      
      if (quote.quoteItem && quote.quoteItem.length > 0) {
        const quoteItem = quote.quoteItem[0];
        const product = quoteItem.product;
        const characteristics = product?.productCharacteristic || [];
        
        const bandwidthChar = characteristics.find(c => c.name?.toLocaleLowerCase() === 'bandwidth');
        if (bandwidthChar?.value) {
          state.serviceNeeds.endBandwidth = bandwidthChar.value.toString();
        }
        
        if (product?.place) {
          const endA = product.place.find(p => p.role?.toLocaleLowerCase() === 'pop a');
          const endB = product.place.find(p => p.role?.toLocaleLowerCase() === 'pop b');
          
          if (endA) {
            state.serviceNeeds.endALocation = {
              id: endA.id || '',
              href: '',
              name: endA.name || '',
              // No description field in GeographicAddress type
              status: '',
              code: '',
              place: [],
              '@baseType': '',
              '@schemaLocation': '',
              '@type': ''
            };
          }
          
          if (endB) {
            state.serviceNeeds.endBLocation = {
              id: endB.id || '',
              href: endB.href|| '',
              name: endB.name || '',
              // No description field in GeographicAddress type
              status: '',
              code: '',
              place: [],
              '@baseType': '',
              '@schemaLocation': '',
              '@type': ''
            };
          }
        }
      }
      
      if (quote.quoteItem && quote.quoteItem.length > 0) {
        const quoteItem = quote.quoteItem[0];
        const product = quoteItem.product;
        const characteristics = product?.productCharacteristic || [];
        
        state.technicalFeasibility.endA.interfaceDetails.interfaceId = 
          characteristics.find(c => c.name === 'PointA_Router')?.value?.toString() || 
          state.technicalFeasibility.endA.interfaceDetails.interfaceId;
          
        if (product?.place) {
          const endA = product.place.find(p => p.role?.toLocaleLowerCase() === 'pop a');
          if (endA) {
            let address = endA.streetName || '';
            let city = `${endA.postcode || ''} ${endA.city || ''}`.trim();
            let country = endA.country || '';
            
            if (endA.id && typeof endA.id === 'string') {
              const parts = endA.id.split('/');
              if (parts.length >= 5) {
                country = parts[0] || country;
                address = parts[3] || address;
                city = parts[4] || city;
              }
            }
            
            state.technicalFeasibility.endA.location = endA.name || state.technicalFeasibility.endA.location;
            state.technicalFeasibility.endA.place = {
              address,
              city,
              country
            };
          }
        }
        
        state.technicalFeasibility.endA.interfaceDetails.portType = 
          characteristics.find(c => c.name === 'PointA_IntfType')?.value?.toString() || 
          state.technicalFeasibility.endA.interfaceDetails.portType;
        
        state.technicalFeasibility.endA.connectionMode = 
          characteristics.find(c => c.name === 'PointA_PortMode')?.value === 'PORT' ? 'PORT' : 'VLAN';
        
        state.technicalFeasibility.endA.vlanNumber = 
          characteristics.find(c => c.name === 'PointA_VLAN')?.value?.toString() || 
          state.technicalFeasibility.endA.vlanNumber;
        
        state.technicalFeasibility.endA.crossConnect = 
          characteristics.find(c => c.name === 'PointA_CrossConn')?.value === 'true';
        
        state.technicalFeasibility.endA.capacity = 
          characteristics.find(c => c.name === 'PointA_IntfCapacity')?.value?.toString() || 
          state.technicalFeasibility.endA.capacity;
        
        state.technicalFeasibility.endB.interfaceDetails.interfaceId = 
          characteristics.find(c => c.name === 'PointB_Router')?.value?.toString() || 
          state.technicalFeasibility.endB.interfaceDetails.interfaceId;
          
        if (product?.place) {
          const endB = product.place.find(p => p.role?.toLocaleLowerCase() === 'pop b');
          if (endB) {
            let address = endB.streetName || '';
            let city = `${endB.postcode || ''} ${endB.city || ''}`.trim();
            let country = endB.country || '';
            
            if (endB.id && typeof endB.id === 'string') {
              const parts = endB.id.split('/');
              if (parts.length >= 5) {
                country = parts[0] || country;
                address = parts[3] || address;
                city = parts[4] || city;
              }
            }
            
            state.technicalFeasibility.endB.location = endB.name || state.technicalFeasibility.endB.location;
            state.technicalFeasibility.endB.place = {
              address,
              city,
              country
            };
          }
        }
        
        state.technicalFeasibility.endB.interfaceDetails.portType = 
          characteristics.find(c => c.name === 'PointB_IntfType')?.value?.toString() || 
          state.technicalFeasibility.endB.interfaceDetails.portType;
        
        state.technicalFeasibility.endB.connectionMode = 
          characteristics.find(c => c.name === 'PointB_PortMode')?.value === 'PORT' ? 'PORT' : 'VLAN';
        
        state.technicalFeasibility.endB.vlanNumber = 
          characteristics.find(c => c.name === 'PointB_VLAN')?.value?.toString() || 
          state.technicalFeasibility.endB.vlanNumber;
        
        state.technicalFeasibility.endB.crossConnect = 
          characteristics.find(c => c.name === 'PointB_CrossConn')?.value === 'true';
        
        state.technicalFeasibility.endB.capacity = 
          characteristics.find(c => c.name === 'PointB_IntfCapacity')?.value?.toString() || 
          state.technicalFeasibility.endB.capacity;
      }
      
      if (quote.quoteItem && quote.quoteItem.length > 0) {
        const quoteItem = quote.quoteItem[0];
        const product = quoteItem.product;
        
        if (product?.productOffering?.name) {
          const offerType = product.productOffering.name.includes('Essential') ? 'Essential' : 
                           product.productOffering.name.includes('Dynamic') ? 'Dynamic' : 
                           product.productOffering.name.includes('Intense') ? 'Intense' : 
                           state.commercialProposal.selectedPackage.type;
          
          state.commercialProposal.selectedPackage.type = offerType as 'Essential' | 'Dynamic' | 'Intense';
        }
        
        if (product?.productTerm && Array.isArray(product.productTerm) && product.productTerm.length > 0) {
          const term = product.productTerm[0].name || '';
          state.commercialProposal.selectedPackage.period = 
            term.includes('36') ? 36 : 
            term.includes('24') ? 24 : 
            term.includes('12') ? 12 : 0;
        }
        
        if (quoteItem.quoteItemPrice && quoteItem.quoteItemPrice.length > 0) {
          const prices = quoteItem.quoteItemPrice;
          const mainPrice = prices.find(p => p.name === 'RecurringCharge');
          if (mainPrice?.price && typeof mainPrice.price === 'object') {
            const priceValue = Object.prototype.hasOwnProperty.call(mainPrice.price, 'value') ? 
              (mainPrice.price as Record<string, unknown>).value as string | number : 0;
            
            state.commercialProposal.selectedPackage.price = Number(priceValue);
            
            const priceUnit = Object.prototype.hasOwnProperty.call(mainPrice.price, 'unit') ? 
              (mainPrice.price as Record<string, unknown>).unit as string : '€';
              
            state.commercialProposal.selectedPackage.currency = priceUnit;
          }
          
          const installationPrice = prices.find(p => p.name === 'InstallationFee');
          if (installationPrice?.price && typeof installationPrice.price === 'object') {
            const installValue = Object.prototype.hasOwnProperty.call(installationPrice.price, 'value') ? 
              (installationPrice.price as Record<string, unknown>).value as string | number : 0;
              
            state.commercialProposal.installationFee = Number(installValue);
          }
        }
      }
      
      if (quote.relatedParty && Array.isArray(quote.relatedParty)) {
        const commercialContact = quote.relatedParty.find(party => 
          party.role?.toLowerCase().includes('commercial') || 
          party.role?.toLowerCase().includes('sales') ||
          party.role?.toLowerCase() === 'contact');
          
        if (commercialContact) {
          const contactEmail = commercialContact.contactMedium?.find(cm => 
            cm.mediumType?.toLowerCase() === 'email')?.characteristic?.emailAddress || '';
            
          const contactPhone = commercialContact.contactMedium?.find(cm => 
            cm.mediumType?.toLowerCase() === 'phone' || 
            cm.mediumType?.toLowerCase() === 'mobile')?.characteristic?.phoneNumber || '';
          
          const companyName = commercialContact.tradingName || commercialContact.organizationType || '';
          
          const contactTitle = commercialContact.partyCharacteristic?.find(c => 
            c.name?.toLowerCase() === 'title' || c.name?.toLowerCase() === 'role')?.value?.toString() || '';
          
          const addressMedium = commercialContact.contactMedium?.find(cm => 
            cm.mediumType?.toLowerCase() === 'address')?.characteristic;
            
          const addressParts = [];
          if (addressMedium?.street1) addressParts.push(addressMedium.street1);
          if (addressMedium?.street2) addressParts.push(addressMedium.street2);
          if (addressMedium?.city) addressParts.push(addressMedium.city);
          if (addressMedium?.stateOrProvince) addressParts.push(addressMedium.stateOrProvince);
          if (addressMedium?.country) addressParts.push(addressMedium.country);
          const fullAddress = addressParts.join(', ');
          
          state.contactInformation.commercialContact = {
            name: commercialContact.name || '',
            title: contactTitle,
            company: companyName,
            address: fullAddress,
            phone: contactPhone,
            email: contactEmail
          };
        }
        
        const technicalContact = quote.relatedParty.find(party => 
          party.role?.toLowerCase().includes('technical') || 
          party.role?.toLowerCase().includes('tech'));
          
        if (technicalContact) {
          const contactEmail = technicalContact.contactMedium?.find(cm => 
            cm.mediumType?.toLowerCase() === 'email')?.characteristic?.emailAddress || '';
            
          const contactPhone = technicalContact.contactMedium?.find(cm => 
            cm.mediumType?.toLowerCase() === 'phone' || 
            cm.mediumType?.toLowerCase() === 'mobile')?.characteristic?.phoneNumber || '';
          
          const companyName = technicalContact.tradingName || technicalContact.organizationType || '';
          
          const contactTitle = technicalContact.partyCharacteristic?.find(c => 
            c.name?.toLowerCase() === 'title' || c.name?.toLowerCase() === 'role')?.value?.toString() || '';
          
          const addressMedium = technicalContact.contactMedium?.find(cm => 
            cm.mediumType?.toLowerCase() === 'address')?.characteristic;
            
          const addressParts = [];
          if (addressMedium?.street1) addressParts.push(addressMedium.street1);
          if (addressMedium?.street2) addressParts.push(addressMedium.street2);
          if (addressMedium?.city) addressParts.push(addressMedium.city);
          if (addressMedium?.stateOrProvince) addressParts.push(addressMedium.stateOrProvince);
          if (addressMedium?.country) addressParts.push(addressMedium.country);
          const fullAddress = addressParts.join(', ');
          
          state.contactInformation.technicalContact = {
            name: technicalContact.name || '',
            title: contactTitle,
            company: companyName,
            address: fullAddress,
            phone: contactPhone,
            email: contactEmail
          };
        }
        
        const billingContact = quote.relatedParty.find(party => 
          party.role?.toLowerCase().includes('billing') || 
          party.role?.toLowerCase().includes('finance') ||
          party.role?.toLowerCase().includes('payment'));
          
        if (billingContact) {
          const contactEmail = billingContact.contactMedium?.find(cm => 
            cm.mediumType?.toLowerCase() === 'email')?.characteristic?.emailAddress || '';
            
          const contactPhone = billingContact.contactMedium?.find(cm => 
            cm.mediumType?.toLowerCase() === 'phone' || 
            cm.mediumType?.toLowerCase() === 'mobile')?.characteristic?.phoneNumber || '';
          
          const companyName = billingContact.tradingName || billingContact.organizationType || '';
          
          const contactTitle = billingContact.partyCharacteristic?.find(c => 
            c.name?.toLowerCase() === 'title' || c.name?.toLowerCase() === 'role')?.value?.toString() || '';
          
          const addressMedium = billingContact.contactMedium?.find(cm => 
            cm.mediumType?.toLowerCase() === 'address')?.characteristic;
            
          const addressParts = [];
          if (addressMedium?.street1) addressParts.push(addressMedium.street1);
          if (addressMedium?.street2) addressParts.push(addressMedium.street2);
          if (addressMedium?.city) addressParts.push(addressMedium.city);
          if (addressMedium?.stateOrProvince) addressParts.push(addressMedium.stateOrProvince);
          if (addressMedium?.country) addressParts.push(addressMedium.country);
          const fullAddress = addressParts.join(', ');
          
          state.contactInformation.billingContact = {
            name: billingContact.name || '',
            title: contactTitle,
            company: companyName,
            address: fullAddress,
            phone: contactPhone,
            email: contactEmail
          };
        }
        
        const faultContact = quote.relatedParty.find(party => 
          party.role?.toLowerCase().includes('fault') || 
          party.role?.toLowerCase().includes('maintenance') ||
          party.role?.toLowerCase().includes('support'));
          
        if (faultContact) {
          const contactEmail = faultContact.contactMedium?.find(cm => 
            cm.mediumType?.toLowerCase() === 'email')?.characteristic?.emailAddress || '';
            
          const contactPhone = faultContact.contactMedium?.find(cm => 
            cm.mediumType?.toLowerCase() === 'phone' || 
            cm.mediumType?.toLowerCase() === 'mobile')?.characteristic?.phoneNumber || '';
          
          const groupName = faultContact.tradingName || faultContact.organizationType || 'NOC';
          
          const workingHours = faultContact.partyCharacteristic?.find(c => 
            c.name?.toLowerCase().includes('hours') || 
            c.name?.toLowerCase().includes('availability'))?.value?.toString() || '24/7';
          
          state.contactInformation.faultManagement = {
            groupName: groupName,
            name: faultContact.name || '',
            phone: contactPhone,
            email: contactEmail,
            workingHours: workingHours
          };
        }
        
        const dataProtectionContact = quote.relatedParty.find(party => 
          party.role?.toLowerCase().includes('data') || 
          party.role?.toLowerCase().includes('protection') ||
          party.role?.toLowerCase().includes('privacy'));
          
        if (dataProtectionContact) {
          const contactEmail = dataProtectionContact.contactMedium?.find(cm => 
            cm.mediumType?.toLowerCase() === 'email')?.characteristic?.emailAddress || '';
            
          const contactPhone = dataProtectionContact.contactMedium?.find(cm => 
            cm.mediumType?.toLowerCase() === 'phone' || 
            cm.mediumType?.toLowerCase() === 'mobile')?.characteristic?.phoneNumber || '';
          
          state.contactInformation.dataProtectionContact = {
            name: dataProtectionContact.name || '',
            phone: contactPhone,
            email: contactEmail
          };
        }
      }
      
      if (quote.requestedQuoteCompletionDate) {
        state.requestedDate.date = new Date(quote.requestedQuoteCompletionDate).toISOString().split('T')[0];
      } else if (quote.expectedQuoteCompletionDate) {
        state.requestedDate.date = new Date(quote.expectedQuoteCompletionDate).toISOString().split('T')[0];
      }
    },
    
  },
});

export const {
  setCurrentStep,
  updateServiceNeeds,
  updateTechnicalFeasibility,
  updateCommercialProposal,
  updateContactInformation,
  updateRequestedDate,
  nextStep,
  prevStep,
  resetForm,
  submitForm,
  submitFormSuccess,
  submitFormFailure,
  initializeFromQuote,
  setFormValidState,
} = quoteFormSlice.actions;

export const selectCurrentStep = (state: RootState) => state.quoteForm.currentStep;
export const selectServiceNeeds = (state: RootState) => state.quoteForm.serviceNeeds;
export const selectTechnicalFeasibility = (state: RootState) => state.quoteForm.technicalFeasibility;
export const selectCommercialProposal = (state: RootState) => state.quoteForm.commercialProposal;
export const selectContactInformation = (state: RootState) => state.quoteForm.contactInformation;
export const selectRequestedDate = (state: RootState) => state.quoteForm.requestedDate;
export const selectSubmitting = (state: RootState) => state.quoteForm.submitting;
export const selectError = (state: RootState) => state.quoteForm.error;

export default quoteFormSlice.reducer;
