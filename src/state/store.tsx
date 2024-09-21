import { configureStore } from '@reduxjs/toolkit'
import ProfileSlice from './ProfileSlice'
import CalendarySlice from './CalendarySlice'
import CodeSlice from './CodeSlice'
import PromotionSlice from './PromotionSlice'
import SpecialitySlice from './SpecialitySlice'
import ServicesSlice from './ServicesSlice'
import PopUpSlice from './PopUpSlice'
import GoogleDataSlice from './GoogleDataSlice'
import AuthorizationSlice from './AuthorizationSlice'


export const store = configureStore({
  reducer: {
    user:ProfileSlice,
    authorization:AuthorizationSlice,
    google:GoogleDataSlice,
    calendary: CalendarySlice,
    code: CodeSlice,
    promotions: PromotionSlice,
    speciality: SpecialitySlice,
    services: ServicesSlice,
    popups: PopUpSlice
  },
})