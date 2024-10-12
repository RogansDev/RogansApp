import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user_id:0,
    email:null,
    role:null,
    urlphoto:null,
    document:null,
    name:null,
    lastname:null,
    phone:null,
    birthdate:null,
    createdAt: null,
    plataforma: null,
    token: null,
    logged:false
};

const ProfileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { user_id,
        email,
        role,
        urlphoto,
        document,
        name,
        lastname,
        phone,
        birthdate,
        createdAt,
        plataforma,
        token,
      } = action.payload;
      state.user_id = user_id;
      state.email = email;
      state.role = role;
      state.urlphoto = urlphoto;
      state.document = document;
      state.phone = phone;
      state.name = name;
      state.birthdate = birthdate;
      state.lastname=lastname;
      state.createdAt = createdAt;
      state.plataforma = plataforma;
      state.token = token;
      state.logged=true
    },
    setClearUserInfo: (state, action) => {
        state.user_id =0;
        state.email =null;
        state.role =null;
        state.urlphoto =null;
        state.document =null;
        state.phone =null;
        state.name =null;
        state.birthdate =null;
        state.createdAt =null;
        state.plataforma =null;
        state.token =null;
        state.lastname=null;
        state.logged=false
    },
  },
});

export const { setUserInfo, setClearUserInfo } = ProfileSlice.actions;

export default ProfileSlice.reducer;
