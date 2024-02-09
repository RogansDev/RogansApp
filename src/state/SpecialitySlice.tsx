import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  especialidadEstado: '',
};

const SpecialitySlice = createSlice({
  name: 'speciality',
  initialState,
  reducers: {
    setSpecialityInfo: (state, action) => {
      const {
        especialidadEstado,
      } = action.payload;
      state.especialidadEstado = especialidadEstado;
    },
    setClearSpecialityInfo: (state, action) => {
      state.especialidadEstado='';
    },
    resetSpecificSpecialityInfo: (state, action) => {
      const propertiesToReset = action.payload;

      propertiesToReset.forEach(property => {
        if (state.hasOwnProperty(property)) {
          state[property] = initialState[property];
        }
      });
    },
  },
});

export const { setSpecialityInfo, setClearSpecialityInfo, resetSpecificSpecialityInfo } = SpecialitySlice.actions;

export default SpecialitySlice.reducer;
