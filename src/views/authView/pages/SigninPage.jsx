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
  Dialog,
  DialogContent,
  DialogTitle,
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

const initialState = {
  email: "",
  password: "",
  isShowPassword: false,
  isShowResendVerification: false,
  isShowPasswordReset: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "showPassword":
      return { ...state, isShowPassword: action.payload };
    case "showResendVerification":
      return { ...state, isShowResendVerification: action.payload };
    case "showPasswordReset":
      return { ...state, isShowPasswordReset: action.payload };
    default:
      return state;
  }
};

const SigninPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tokenExpirationDate } = useSelector((state) => state.auth);
  const [signinState, signinDispatch] = useReducer(reducer, initialState);

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
                  signinDispatch({ type: "email", payload: e.target.value })
                }
                value={signinState.email}
                fullWidth={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailSharp />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                type={signinState.isShowPassword ? "text" : "password"}
                variant="outlined"
                onChange={(e) =>
                  signinDispatch({ type: "password", payload: e.target.value })
                }
                value={signinState.password}
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
              />
              <Button
                variant="contained"
                size="large"
                onClick={() =>
                  dispatch(
                    login(
                      signinState.email,
                      signinState.password,
                      tokenExpirationDate,
                      navigate
                    )
                  )
                }
                fullWidth
              >
                LOGIN
              </Button>
              <Button
                variant="text"
                onClick={() =>
                  signinDispatch({ type: "showPasswordReset", payload: true })
                }
              >
                Forgot Password?
              </Button>
              {signinState.isShowResendVerification && (
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
            open={signinState.isShowPasswordReset}
            handleClose={() =>
              signinDispatch({ type: "showPasswordReset", payload: false })
            }
            handleSubmit={(email) => dispatch(resetPassword(email))}
          />
        </Card>
      </Container>
    </Box>
  );
};

export default SigninPage;
