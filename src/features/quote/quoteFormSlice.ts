import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';


// Define interfaces for geographic site data
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
  updatedDate: string; // ISO tarih formatı
  revision: number;
  streetName: string;
  createdDate: string; // ISO tarih formatı
  createdBy: string;
}



interface ServiceNeedsData {
  endBandwidth?: string;
  endALocation?: GeographicSite | null;
  endBLocation?: GeographicSite | null;
}

// Technical Feasibility data types
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
  vlanNumber?: string;
  crossConnect: boolean;
  capacity: string;
}

interface TechnicalFeasibilityData {
  endA: EndpointDetails;
  endB: EndpointDetails;
}

// Commercial Proposal data types
interface CommercialPackage {
  type: 'Essential' | 'Dynamic' | 'Intense';
  price: number;
  currency: string;
  period: 36 | 24 | 12 | 0; // 0 means no commitment
}

interface CommercialProposalData {
  selectedPackage: CommercialPackage;
  installationFee: number;
  recurringCharges: Record<string, number>;
}

// Contact Information data types
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

// Summary data
interface RequestedDateInfo {
  date: string;
}

// Complete form state type
interface QuoteFormState {
  currentStep: number;
  serviceNeeds: ServiceNeedsData;
  technicalFeasibility: TechnicalFeasibilityData;
  commercialProposal: CommercialProposalData;
  contactInformation: ContactInformationData;
  requestedDate: RequestedDateInfo;
  submitting: boolean;
  error: string | null;
}

// Initial default data for form state
const initialState: QuoteFormState = {
  currentStep: 0,
  serviceNeeds: {},
  technicalFeasibility: {
    endA: {
      location: 'Paris 03 / Paris Lab 3',
      interfaceDetails: {
        interfaceId: 'TenGigE0/0/0/0/12',
        portType: 'MPPCR1',
        availability: '9.992Gbps/10Gbps',
        speed: '10 Gbps',
      },
      connectionMode: 'VLAN',
      vlanNumber: '23',
      crossConnect: false,
      capacity: '10 Gbps',
    },
    endB: {
      location: 'Abidjan / Paris Lab 1',
      interfaceDetails: {
        interfaceId: 'TenGigE0/0/3/0/41',
        portType: 'MPPR4',
        availability: '9.704Gbps/10Gbps',
        speed: '10 Gbps',
      },
      connectionMode: 'PORT',
      vlanNumber: '3',
      crossConnect: true,
      capacity: '10 Gbps',
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
      if (state.currentStep < 4) {
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
  },
});

// Export actions
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
} = quoteFormSlice.actions;

// Export selectors
export const selectCurrentStep = (state: RootState) => state.quoteForm.currentStep;
export const selectServiceNeeds = (state: RootState) => state.quoteForm.serviceNeeds;
export const selectTechnicalFeasibility = (state: RootState) => state.quoteForm.technicalFeasibility;
export const selectCommercialProposal = (state: RootState) => state.quoteForm.commercialProposal;
export const selectContactInformation = (state: RootState) => state.quoteForm.contactInformation;
export const selectRequestedDate = (state: RootState) => state.quoteForm.requestedDate;
export const selectSubmitting = (state: RootState) => state.quoteForm.submitting;
export const selectError = (state: RootState) => state.quoteForm.error;

export default quoteFormSlice.reducer;
