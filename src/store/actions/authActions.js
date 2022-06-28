import AuthAPI from "../../shared/apis/AuthAPI";
import { authActions } from "../slices/AuthSlice";
import { feedbackActions } from "../slices/FeedbackSlice";
import { profileActions } from "../slices/ProfileSlice";

export const login = (email, password, tokenExpirationDate, navigate) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await AuthAPI.login(email, password);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      let TOKEN_EXPIRATION = new Date(new Date().getTime() + 1000 * 60 * 60);
      const expirationDate = !!tokenExpirationDate
        ? new Date(tokenExpirationDate) < new Date()
          ? TOKEN_EXPIRATION
          : tokenExpirationDate
        : TOKEN_EXPIRATION.toISOString();
      dispatch(
        authActions.setData({
          ...response.user,
          tokenExpirationDate: expirationDate,
        })
      );
      dispatch(profileActions.setUser(response.user));
      dispatch(profileActions.setNewUser(response.user));
      localStorage.setItem(
        import.meta.env.VITE_LS_USER_DATA,
        JSON.stringify({
          userId: response.user.userId,
          token: response.user.token,
          firstname: response.user.firstname,
          lastname: response.user.lastname,
          tokenExpirationDate: expirationDate,
          accountType: response.user.accountType,
        })
      );
      navigate("/");
    } else if (response.status === 403) {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
      dispatch(authActions.setShowResendVerification(true));
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

export const signup = (user, navigate) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await AuthAPI.signup(user);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      navigate("/signin", { state: { toVerify: true } });
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

export const logout = (navigate) => {
  return async (dispatch) => {
    dispatch(authActions.setData({}));
    localStorage.removeItem(import.meta.env.LS_USER_DATA);
    navigate("/");
  };
};

export const verify = (email) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await AuthAPI.resendConfirmation(email);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.message,
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

export const resetPassword = (email) => {
  return async (dispatch) => {
    dispatch(authActions.setShowPasswordResetDialog(false));
    dispatch(feedbackActions.setLoading(true));
    const response = await AuthAPI.sendResetPassword(email);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: "Password reset link has been sent into your email.",
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

const authThunks = { login, signup, logout, verify, resetPassword };
export default authThunks;
