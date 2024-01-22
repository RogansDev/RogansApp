import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    codigo:null,
    status:null,
    charge:null,
    user_id:null, 
    date_to_use:null,
    date_to_expired: null
};


const PromotionSlice = createSlice({
    name:'promotions', 
    initialState, 
    reducers:{
        setStatePromotions:(state, action)=>{
            const {codigo, user_id, status, charge, date_to_expired, date_to_use} = action.payload;
            state.codigo=codigo,
            state.user_id=user_id,
            state.status=status,
            state.charge=charge,
            state.date_to_expired=date_to_expired,
            state.date_to_use=date_to_use
        },
        setStateClearPromotion:(state, action)=>{
            state.codigo=null,
            state.user_id=null,
            state.status=null,
            state.charge=null,
            state.date_to_expired=null,
            state.date_to_use=null
        }

}})

export const {setStatePromotions, setStateClearPromotion } = PromotionSlice.actions

export default PromotionSlice.reducer