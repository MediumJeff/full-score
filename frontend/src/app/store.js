import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import calendarReducer from '../features/calendar/calendarSlice';
import inventoryReducer from '../features/inventory/inventorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: calendarReducer,
    instruments: inventoryReducer,
  },
});
