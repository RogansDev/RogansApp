import { configureStore } from '@reduxjs/toolkit'
import ProfileSlice from './ProfileSlice'
import CalendarySlice from './CalendarySlice'


export const store = configureStore({
  reducer: {
    user:ProfileSlice,
    calendary: CalendarySlice
  },
})