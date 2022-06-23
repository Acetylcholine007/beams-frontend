import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    isLoading: false,
    isShowSnackbar: false,
    snackbarMessage: "",
    snackbarDuration: 6000,
    severity: "success",
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setNotification(state, action) {
      state.snackbarMessage =
        action.payload.snackbarMessage || "Operation Failed";
      state.isShowSnackbar = action.payload.isShowSnackbar;
      state.severity = action.payload.severity;
      state.snackbarDuration =
        action.payload.snackbarDuration || state.snackbarDuration;
    },
    closeNotification(state) {
      state.snackbarMessage = "";
      state.isShowSnackbar = false;
      state.severity = "success";
      state.snackbarDuration = 6000;
    },
  },
});

export const feedbackActions = feedbackSlice.actions;

export default feedbackSlice;
