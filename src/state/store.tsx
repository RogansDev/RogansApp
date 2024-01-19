import { configureStore } from '@reduxjs/toolkit'
import ProfileSlice from './ProfileSlice'
import CalendarySlice from './CalendarySlice'
import CodeSlice from './CodeSlice'
import PromotionSlice from './PromotionSlice'


export const store = configureStore({
  reducer: {
    user:ProfileSlice,
    calendary: CalendarySlice,
    code: CodeSlice,
    promotions: PromotionSlice
  },
})