import { configureStore } from "@reduxjs/toolkit";

import feedbackSlice from "./slices/FeedbackSlice";
import authSlice from "./slices/AuthSlice";
import dashboardSlice from "./slices/DashboardSlice";
import profileSlice from "./slices/ProfileSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    feedback: feedbackSlice.reducer,
    dashboard: dashboardSlice.reducer,
    profile: profileSlice.reducer,
  },
});

export default store;
