import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userId: null,
    accountType: null,
    firstname: null,
    lastname: null,
    tokenExpirationDate: null,
    isShowPasswordResetDialog: false,
    isShowResendVerification: false,
  },
  reducers: {
    setData(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.accountType = action.payload.accountType;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.tokenExpirationDate = action.payload.tokenExpirationDate;
    },
    updateInfo(state, action) {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
