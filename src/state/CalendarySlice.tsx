import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  fecha: '',
  horaAgendada: '',
  virtualPresecial: '',
  selectedCard: '',
  nombreUsuario: '',
  correoUsuario: '',
  cedulaUsuario: '',
  telUsuario: '',
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
        nombreUsuario,
        correoUsuario,
        cedulaUsuario,
        telUsuario
      } = action.payload;
      state.fecha = fecha;
      state.horaAgendada = horaAgendada;
      state.virtualPresecial = virtualPresecial;
      state.selectedCard = selectedCard;
      state.nombreUsuario = nombreUsuario;
      state.correoUsuario = correoUsuario;
      state.cedulaUsuario = cedulaUsuario;
      state.telUsuario = telUsuario;
    },
    setClearCalendaryInfo: (state, action) => {
      state.fecha='';
      state.horaAgendada='';
      state.virtualPresecial='';
      state.selectedCard='';
      state.nombreUsuario='';
      state.correoUsuario='';
      state.cedulaUsuario='';
      state.telUsuario='';
    },
  },
});

export const { setCalendaryInfo, setClearCalendaryInfo } = CalendarySlice.actions;

export default CalendarySlice.reducer;
