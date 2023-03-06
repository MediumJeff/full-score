import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import calendarReducer from '../features/calendar/calendarSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: calendarReducer,
  },
});
