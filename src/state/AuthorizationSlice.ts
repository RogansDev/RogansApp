import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logged: false,
  phone: null,
};

const AuthorizationSlice = createSlice({
  name: "authorizationLogged",
  initialState,
  reducers: {
    setAuthorizationInfo: (state, action) => {
      state.logged = action.payload.logged;
      state.phone = action.payload.phone;
    },
    setClearAuthorizationInfo: (state, action) => {
      state.logged = false;
      state.phone = null;
    },
  },
});

export const { setAuthorizationInfo, setClearAuthorizationInfo } =
  AuthorizationSlice.actions;

export default AuthorizationSlice.reducer;
