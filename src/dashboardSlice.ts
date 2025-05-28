import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface DashboardState {
  welcomeMessage: string;
}

const initialState: DashboardState = {
  welcomeMessage: 'Welcome from Redux! This is the main dashboard.',
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setWelcomeMessage: (state, action: PayloadAction<string>) => {
      state.welcomeMessage = action.payload;
    },
  },
});

export const { setWelcomeMessage } = dashboardSlice.actions;

export const selectWelcomeMessage = (state: RootState) => state.dashboard.welcomeMessage;

export default dashboardSlice.reducer;
