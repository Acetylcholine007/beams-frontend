import { configureStore } from "@reduxjs/toolkit";

import feedbackSlice from "./slices/FeedbackSlice";
import authSlice from "./slices/AuthSlice";
import dashboardSlice from "./slices/dashboardSlice";
import profileSlice from "./slices/profileSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    feedback: feedbackSlice.reducer,
    dashboard: dashboardSlice.reducer,
    profile: profileSlice,
  },
});

export default store;
