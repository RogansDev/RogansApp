import { configureStore } from '@reduxjs/toolkit'
import ProfileSlice from './ProfileSlice'
import CalendarySlice from './CalendarySlice'
import CodeSlice from './CodeSlice'
import PromotionSlice from './PromotionSlice'
import SpecialitySlice from './SpecialitySlice'


export const store = configureStore({
  reducer: {
    user:ProfileSlice,
    calendary: CalendarySlice,
    code: CodeSlice,
    promotions: PromotionSlice,
    speciality: SpecialitySlice
  },
})