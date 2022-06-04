import requestAxios from "../../utils/requestAxios";

const editAccount = async (
  data,
  loadingDispatch,
  snackbarDispatch,
  callback,
  userId
) => {
  console.log(data)
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(`/users/${userId}`, data, "PATCH");
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Account Edited",
        isOpen: true,
        severity: "success",
      },
    });
    callback();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to Account",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const changePassword = async (password, loadingDispatch, snackbarDispatch, userId) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(`/users/changePassword/${userId}`, { password }, "PATCH");
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Password Edited",
        isOpen: true,
        severity: "success",
      },
    });
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to edit password",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const UserAPI = {
  editAccount,
  changePassword,
};

export default UserAPI;
