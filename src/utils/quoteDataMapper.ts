import { addBusinessDays, addDays } from 'date-fns';
import type { Quote } from '../types/QuoteManagement/Quote';

interface MappedQuoteData {
  billingAccount: string;
  endA: string;
  endB: string;
  bandwidth: string;
  existingInterfaceTypeA: string;
  existingInterfaceRouterA: string;
  existingInterfaceAvailabilityA: string;
  existingInterfaceTypeB: string;
  existingInterfaceRouterB: string;
  existingInterfaceAvailabilityB: string;
  vlanA: string;
  vlanB: string;
  portModeA: string;
  portModeB: string;
  newInterfaceCapacityA: string;
  newInterfaceTypeA: string;
  newInterfaceCapacityB: string;
  newInterfaceTypeB: string;
  newInterfaceA: boolean;
  newInterfaceB: boolean;
  crossConnectA: boolean;
  crossConnectB: boolean;
  offer: string;
  price: string;
  commitment: string;
  expectedQuoteCompletionDate: string;
  requestedQuoteCompletionDate: string;
}

/**
 * Extract characteristic value from product characteristics
 */
import { Characteristic } from '../types/QuoteManagement/Characteristic';

const getCharacteristicValue = (
  characteristics: Characteristic[] | undefined,
  name: string
): string => {
  if (!characteristics || !Array.isArray(characteristics)) {
    return 'N/A';
  }
  
  const characteristic = characteristics.find(
    (c) => c.name === name || c.id === name
  );
  return characteristic?.value?.toString() || 'N/A';
};

/**
 * Map quote data according to the provided schema
 */
export const mapQuoteData = (quote: Quote | null): MappedQuoteData | null => {
  if (!quote) return null;

  const quoteItem = Array.isArray(quote.quoteItem) && quote.quoteItem.length > 0 
    ? quote.quoteItem[0] 
    : undefined;

  const product = quoteItem?.product;

  const productCharacteristic = product?.productCharacteristic;

  const createdDate = quote.createdDate ? new Date(quote.createdDate) : new Date();
  const expectedDate = addDays(createdDate, 7);
  const requestedDate = addBusinessDays(createdDate, 15);

  return {
    billingAccount: quote.billingAccount?.id || 'N/A',
    endA: product?.place?.find((p) => p.role === 'A')?.name || 'N/A',
    endB: product?.place?.find((p) => p.role === 'B')?.name || 'N/A',
    bandwidth: getCharacteristicValue(productCharacteristic, 'Bandwidth'),
    existingInterfaceTypeA: getCharacteristicValue(productCharacteristic, 'PointA_IntfType'),
    existingInterfaceRouterA: getCharacteristicValue(productCharacteristic, 'PointA_Router'),
    existingInterfaceAvailabilityA: 
      getCharacteristicValue(productCharacteristic, 'PointA_IsPhysIntf') + ' / ' +
      getCharacteristicValue(productCharacteristic, 'PointA_IntfCapacity'),
    existingInterfaceTypeB: getCharacteristicValue(productCharacteristic, 'PonitB_IntfType'),
    existingInterfaceRouterB: getCharacteristicValue(productCharacteristic, 'PointB_Router'),
    existingInterfaceAvailabilityB: 
      getCharacteristicValue(productCharacteristic, 'PointA_IsPhysIntf') + ' / ' + 
      getCharacteristicValue(productCharacteristic, 'PointA_IntfCapacity'),
    vlanA: getCharacteristicValue(productCharacteristic, 'PointA_VLAN'),
    vlanB: getCharacteristicValue(productCharacteristic, 'PointB_VLAN'),
    portModeA: getCharacteristicValue(productCharacteristic, 'PointA_PortMode'),
    portModeB: getCharacteristicValue(productCharacteristic, 'PointB_PortMode'),
    newInterfaceCapacityA: getCharacteristicValue(productCharacteristic, 'PointA_IntfCapacity'),
    newInterfaceTypeA: getCharacteristicValue(productCharacteristic, 'PointA_IntfType'),
    newInterfaceCapacityB: getCharacteristicValue(productCharacteristic, 'PointB_IntfCapacity'),
    newInterfaceTypeB: getCharacteristicValue(productCharacteristic, 'PointB_IntfType'),
    newInterfaceA: getCharacteristicValue(productCharacteristic, 'PointA_IsNewIntf') === 'true',
    newInterfaceB: getCharacteristicValue(productCharacteristic, 'PointB_IsNewIntf') === 'true',
    crossConnectA: getCharacteristicValue(productCharacteristic, 'PointA_CrossConn') === 'true',
    crossConnectB: getCharacteristicValue(productCharacteristic, 'PointB_CrossConn') === 'true',
    offer: `${product?.productOffering?.name || 'N/A'} - ${product?.name || 'N/A'}`,
    price: quoteItem?.quoteItemPrice?.map(p => `${p.price?.value || 0} ${p.price?.unit || 'EUR'}`).join(', ') || 'N/A',
    commitment: product?.productTerm?.name || 'N/A',
    expectedQuoteCompletionDate: expectedDate.toISOString().split('T')[0],
    requestedQuoteCompletionDate: requestedDate.toISOString().split('T')[0],
  };
};
