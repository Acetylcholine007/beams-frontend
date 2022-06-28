import { createTheme, ThemeProvider } from "@mui/material";
import { indigo, red } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";
import "./App.css";
import { useEffect } from "react";
import { logout } from "./store/actions/authActions";
import { useNavigate } from "react-router-dom";
import { authActions } from "./store/slices/AuthSlice";
import { profileActions } from "./store/slices/ProfileSlice";

let logoutTimer;

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: red,
  },
});

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, tokenExpirationDate } = useSelector(
    (state) => state.auth
  );

  // AUTO LOGOUT
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(() => dispatch(logout(navigate)), remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate]);

  // AUTO LOGIN
  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem(import.meta.env.VITE_LS_USER_DATA)
    );
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.tokenExpirationDate) > new Date()
    ) {
      let TOKEN_EXPIRATION = new Date(new Date().getTime() + 1000 * 60 * 60);
      const expirationDate = !!tokenExpirationDate
        ? new Date(tokenExpirationDate) < new Date()
          ? TOKEN_EXPIRATION
          : tokenExpirationDate
        : TOKEN_EXPIRATION.toISOString();
      dispatch(
        authActions.setData({
          userId: storedData.userId,
          token: storedData.token,
          firstname: storedData.firstname,
          lastname: storedData.lastname,
          contactNo: storedData.contactNo,
          address: storedData.address,
          profileUri: storedData.profileUri,
          accountType: storedData.accountType,
          tokenExpirationDate: expirationDate,
        })
      );
      dispatch(
        profileActions.setUser({
          userId: storedData.userId,
          token: storedData.token,
          firstname: storedData.firstname,
          lastname: storedData.lastname,
          contactNo: storedData.contactNo,
          address: storedData.address,
          profileUri: storedData.profileUri,
          accountType: storedData.accountType,
        })
      );
      dispatch(
        profileActions.setNewUser({
          userId: storedData.userId,
          token: storedData.token,
          firstname: storedData.firstname,
          lastname: storedData.lastname,
          contactNo: storedData.contactNo,
          address: storedData.address,
          profileUri: storedData.profileUri,
          accountType: storedData.accountType,
        })
      );
      navigate("/");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {!!token && <AdminLayout />}
      {!token && <PublicLayout />}
    </ThemeProvider>
  );
}

export default App;
