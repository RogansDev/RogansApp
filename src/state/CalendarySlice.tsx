import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  fecha: '',
  horaAgendada: '',
  virtualPresencial: '',
  selectedCard: '',
};

const CalendarySlice = createSlice({
  name: 'calendary',
  initialState,
  reducers: {
    setCalendaryInfo: (state, action) => {
      const {
        fecha,
        horaAgendada,
        virtualPresencial,
        selectedCard,
      } = action.payload;
      state.fecha = fecha;
      state.horaAgendada = horaAgendada;
      state.virtualPresencial = virtualPresencial;
      state.selectedCard = selectedCard;
    },
    setClearCalendaryInfo: (state, action) => {
      state.fecha='';
      state.horaAgendada='';
      state.virtualPresencial='';
      state.selectedCard='';
    },
    resetSpecificCalendaryInfo: (state, action) => {
      const propertiesToReset = action.payload;

      propertiesToReset.forEach(property => {
        if (state.hasOwnProperty(property)) {
          state[property] = initialState[property];
        }
      });
    },
  },
});

export const { setCalendaryInfo, setClearCalendaryInfo, resetSpecificCalendaryInfo } = CalendarySlice.actions;

export default CalendarySlice.reducer;
