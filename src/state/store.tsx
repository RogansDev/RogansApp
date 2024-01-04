import { configureStore } from '@reduxjs/toolkit'
import ProfileSlice from './ProfileSlice'


export const store = configureStore({
  reducer: {
    user:ProfileSlice,
  },
})