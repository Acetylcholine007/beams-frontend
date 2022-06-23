import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    newUser: null,
    profileEditMode: false,
    isShowPasswordDialog: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    editNewUser(state, action) {
      state.newUser[action.payload.field] = action.payload.value;
    },
    setNewUser(state, action) {
      state.newUser = action.payload;
    },
    revertNewUser(state) {
      state.user = state.newUser;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
