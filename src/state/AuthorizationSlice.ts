import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    logged:false
};

const AuthorizationSlice = createSlice({
  name: 'authorizationLogged',
  initialState,
  reducers: {
    setAuthorizationInfo: (state, action) => {
      state.logged=true
    },
    setClearAuthorizationInfo: (state, action) => {
        state.logged=false
    },
  },
});

export const { setAuthorizationInfo, setClearAuthorizationInfo } = AuthorizationSlice.actions;

export default AuthorizationSlice.reducer;
