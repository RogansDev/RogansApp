import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  google_id:null,
  email:null,
  urlphoto:null,
  idToken:null,
  name:null
};

const GoogleDataSlice = createSlice({
  name: 'google',
  initialState,
  reducers: {
    setGoogleInfo: (state, action) => {
      const { google_id,
        email,
        urlphoto,
        name,
        idToken        
        } = action.payload;
      state.google_id = google_id;
      state.email = email;
      state.urlphoto = urlphoto;
      state.name = name;
      state.idToken=idToken
    },
    setClearGoogleInfo: (state) => {
      state.google_id=null,
      state.email=null,
      state.urlphoto=null,
      state.idToken=null,
      state.name=null
    },
  },
});

export const { setGoogleInfo, setClearGoogleInfo } = GoogleDataSlice.actions;

export default GoogleDataSlice.reducer;
