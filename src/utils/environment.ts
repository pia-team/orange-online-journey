
import { env } from '../config';


export const getEnvironmentName = (): string => {
  if (env.isProduction) return 'Production';
  if (env.isStaging) return 'Staging';
  if (env.isTest) return 'Test';
  return 'Development';
};


export const shouldShowEnvironmentBanner = (): boolean => {
  return !env.isProduction;
};


export const getEnvironmentColor = (): string => {
  if (env.isStaging) return '#ff9800';
  if (env.isTest) return '#9c27b0';
  if (env.isDevelopment) return '#2196f3';
  return '#f44336';
};

export default {
  getEnvironmentName,
  shouldShowEnvironmentBanner,
  getEnvironmentColor,
};
