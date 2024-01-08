import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  fecha: '',
  horaAgendada: '',
  virtualPresecial: '',
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
        virtualPresecial,
        selectedCard,
      } = action.payload;
      state.fecha = fecha;
      state.horaAgendada = horaAgendada;
      state.virtualPresecial = virtualPresecial;
      state.selectedCard = selectedCard;
    },
    setClearCalendaryInfo: (state, action) => {
      state.fecha='';
      state.horaAgendada='';
      state.virtualPresecial='';
      state.selectedCard='';
    },
  },
});

export const { setCalendaryInfo, setClearCalendaryInfo } = CalendarySlice.actions;

export default CalendarySlice.reducer;
