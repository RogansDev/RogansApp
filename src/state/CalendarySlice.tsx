import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  fecha: '',
  horaAgendada: '',
  virtualPresencial: '',
  tipoCita: '',
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
        tipoCita
      } = action.payload;
      state.fecha = fecha;
      state.horaAgendada = horaAgendada;
      state.virtualPresencial = virtualPresencial;
      state.tipoCita = tipoCita;
      state.selectedCard = selectedCard;
    },
    setClearCalendaryInfo: (state, action) => {
      state.fecha='';
      state.horaAgendada='';
      state.virtualPresencial='';
      state.tipoCita='';
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
