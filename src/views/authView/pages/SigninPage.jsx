import {
  AlternateEmailSharp,
  LockSharp,
  VisibilityOffSharp,
  VisibilitySharp,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import {
  login,
  resetPassword,
  verify,
} from "../../../store/actions/authActions";
import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import PasswordResetDialog from "../components/PasswordResetDialog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "../../../store/slices/AuthSlice";

const initialState = {
  email: { value: "", isValid: true, message: "" },
  password: { value: "", isValid: true, message: "" },
  isShowPassword: false,
  isShowResendVerification: false,
  isShowPasswordReset: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setEmail":
      return { ...state, email: { ...state.email, value: action.payload } };
    case "setPassword":
      return {
        ...state,
        password: { ...state.password, value: action.payload },
      };
    case "validateEmail":
      return {
        ...state,
        email: {
          ...state.email,
          isValid: action.payload.isValid,
          message: action.payload.message,
        },
      };
    case "validatePassword":
      return {
        ...state,
        password: {
          ...state.password,
          isValid: action.payload.isValid,
          message: action.payload.message,
        },
      };
    case "showPassword":
      return { ...state, isShowPassword: action.payload };
    case "showResendVerification":
      return { ...state, isShowResendVerification: action.payload };
    case "showPasswordReset":
      return { ...state, isShowPasswordReset: action.payload };
    case "resetValidation":
      return {
        ...state,
        email: { ...state.email, isValid: true, message: "" },
        password: { ...state.password, isValid: true, message: "" },
      };
    default:
      return state;
  }
};

const SigninPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tokenExpirationDate } = useSelector((state) => state.auth);
  const [signinState, signinDispatch] = useReducer(reducer, initialState);
  const { isShowResendVerification, isShowPasswordResetDialog } = useSelector(
    (state) => state.auth
  );

  const signInHandler = () => {
    signinDispatch({ type: "resetValidation" });
    dispatch(
      login(
        signinState.email.value,
        signinState.password.value,
        tokenExpirationDate,
        navigate,
        {
          email: (isValid, message) =>
            signinDispatch({
              type: "validateEmail",
              payload: { isValid, message },
            }),
          password: (isValid, message) =>
            signinDispatch({
              type: "validatePassword",
              payload: { isValid, message },
            }),
        }
      )
    );
  };

  useEffect(
    () => () => dispatch(authActions.setShowResendVerification(false)),
    []
  );

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "primary.light",
      }}
    >
      <Container maxWidth="sm" sx={{ minHeight: "80%" }}>
        <Card
          sx={{
            height: "100%",
            p: 4,
            display: "flex",
            flexDirection: "column",
          }}
          elevation={4}
        >
          <CardHeader title="Sign In" align="center" />
          <CardContent sx={{ flexGrow: 1 }}>
            <Stack
              component="form"
              spacing={2}
              noValidate
              autoComplete="off"
              alignItems="center"
              justifyContent="center"
              sx={{ paddingTop: 2 }}
            >
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                onChange={(e) =>
                  signinDispatch({ type: "setEmail", payload: e.target.value })
                }
                value={signinState.email.value}
                fullWidth={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailSharp />
                    </InputAdornment>
                  ),
                }}
                error={!signinState.email.isValid}
                helperText={signinState.email.message}
              />
              <TextField
                label="Password"
                type={signinState.isShowPassword ? "text" : "password"}
                variant="outlined"
                onChange={(e) =>
                  signinDispatch({
                    type: "setPassword",
                    payload: e.target.value,
                  })
                }
                value={signinState.password.value}
                fullWidth={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockSharp />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          signinDispatch({
                            type: "showPassword",
                            payload: !signinState.isShowPassword,
                          })
                        }
                      >
                        {signinState.isShowPassword ? (
                          <VisibilityOffSharp />
                        ) : (
                          <VisibilitySharp />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!signinState.password.isValid}
                helperText={signinState.password.message}
              />
              <Button
                variant="contained"
                size="large"
                onClick={signInHandler}
                fullWidth
              >
                LOGIN
              </Button>
              <Button
                variant="text"
                onClick={() =>
                  dispatch(authActions.setShowPasswordResetDialog(true))
                }
              >
                Forgot Password?
              </Button>
              {isShowResendVerification && (
                <Button
                  variant="text"
                  onClick={() => dispatch(verify(signinState.email))}
                >
                  Resend Email Verification
                </Button>
              )}
              <Divider sx={{ width: "100%" }} />
              <Button
                variant="contained"
                size="large "
                onClick={() => navigate("/register")}
                fullWidth
              >
                Create an Account
              </Button>
            </Stack>
          </CardContent>
          <PasswordResetDialog
            open={isShowPasswordResetDialog}
            handleClose={() =>
              dispatch(authActions.setShowPasswordResetDialog(false))
            }
            handleSubmit={(email) => dispatch(resetPassword(email))}
          />
        </Card>
      </Container>
    </Box>
  );
};

export default SigninPage;
