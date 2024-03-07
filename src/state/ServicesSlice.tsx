import { createSlice } from '@reduxjs/toolkit'

export const ServicesSlice = createSlice({
name: 'services',
initialState: {
  services: []
},
reducers: {
    servicesSuccess: (state, action) => {
        state.services.push({
          id: action.payload.id,
          buttonName: action.payload.buttonName,
          link: action.payload.link,
          url_imagen: action.payload.url_imagen
        });
      },
  servicesFailure: (state) => {
    
    return state
  }, 
  servicesClean: (state) => {
    
    state.services = [];
  },
  servicesRemove: (state, action) => {
    const idToRemove = action.payload;
    state.services = state.services.filter((service) => service.id !== idToRemove);
  }
  },
});
export const { servicesSuccess, servicesFailure, servicesClean, servicesRemove } = ServicesSlice.actions
export default ServicesSlice.reducer;