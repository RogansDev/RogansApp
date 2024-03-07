import { createSlice } from '@reduxjs/toolkit'

export const PopUpSlice = createSlice({
name: 'popups',
initialState: {
    popups: []
},
reducers: {
    popupsSuccess: (state, action) => {
        state.popups.push({
          id: action.payload.id,
          description: action.payload.description,
          acttivo: action.payload.acttivo,
          url_imagen: action.payload.url_imagen
        });
      },
  popupsFailure: (state) => {
    
    return state
  }, 
  popupsClean: (state) => {
    
    state.popups = [];
  },
  popupsRemove: (state, action) => {
    const idToRemove = action.payload;
    state.popups = state.popups.filter((popup) => popup.id !== idToRemove);
  }
  },
});
export const { popupsSuccess, popupsFailure, popupsClean, popupsRemove } = PopUpSlice.actions
export default PopUpSlice.reducer;