export interface SnackBarInfo {
  loading: boolean;
  success: boolean;
  error: boolean;
  loadingMessage: string;
  successMessage: string;
  errorMessage: string;
}

export const initialSnackBarInfo: SnackBarInfo = {
  loading: false,
  success: false,
  error: false,
  loadingMessage: '',
  successMessage: '',
  errorMessage: '',
};
