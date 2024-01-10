import { configureStore } from '@reduxjs/toolkit'
import ProfileSlice from './ProfileSlice'
import CalendarySlice from './CalendarySlice'
import CodeSlice from './CodeSlice'


export const store = configureStore({
  reducer: {
    user:ProfileSlice,
    calendary: CalendarySlice,
    code: CodeSlice
  },
})