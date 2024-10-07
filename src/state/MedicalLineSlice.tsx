import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  lineaMedica: '',
};

const MedicalLineSlice = createSlice({
  name: 'medicalLine',
  initialState,
  reducers: {
    setMedicalLineInfo: (state, action) => {
      const {
        lineaMedica,
      } = action.payload;
      state.lineaMedica = lineaMedica;
    },
    setClearMedicalLineInfo: (state, action) => {
      state.lineaMedica='';
    },
    resetSpecificMedicalLineInfo: (state, action) => {
      const propertiesToReset = action.payload;

      propertiesToReset.forEach((property: PropertyKey) => {
        if (state.hasOwnProperty(property)) {
          state[property] = initialState[property];
        }
      });
    },
  },
});

export const { setMedicalLineInfo, setClearMedicalLineInfo, resetSpecificMedicalLineInfo } = MedicalLineSlice.actions;

export default MedicalLineSlice.reducer;
