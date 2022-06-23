import UserAPI from "../../shared/apis/UserAPI";
import { authActions } from "../slices/AuthSlice";
import { feedbackActions } from "../slices/FeedbackSlice";
import { profileActions } from "../slices/ProfileSlice";

export const changePassword = (password, userId) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await UserAPI.changePassword(password, userId);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: "Password changed",
          isShowSnackbar: true,
          severity: "success",
        })
      );
    } else {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
  };
};

export const editProfile = (newUser, userId) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await UserAPI.editUser(newUser, userId);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      dispatch(authActions.updateInfo(newUser));
      dispatch(profileActions.setUser(newUser));
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: "Profile updated",
          isShowSnackbar: true,
          severity: "success",
        })
      );
    } else {
      dispatch(profileActions.revertNewUser());
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
  };
};
