import {
  AccountCircleSharp,
  AlternateEmailSharp,
  LockSharp,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Avatar,
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
import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../store/actions/authActions";

const initialState = {
  firstname: { value: "", isValid: true, message: "" },
  lastname: { value: "", isValid: true, message: "" },
  password: { value: "", isValid: true, message: "" },
  email: { value: "", isValid: true, message: "" },
  isShowPassword: false,
  isShowProfilePicker: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setFirstname":
      return {
        ...state,
        firstname: { ...state.firstname, value: action.payload },
      };
    case "setLastname":
      return {
        ...state,
        lastname: { ...state.lastname, value: action.payload },
      };
    case "setEmail":
      return { ...state, email: { ...state.email, value: action.payload } };
    case "setPassword":
      return {
        ...state,
        password: { ...state.password, value: action.payload },
      };
    case "validateFirstname":
      return {
        ...state,
        firstname: {
          ...state.firstname,
          isValid: action.payload.isValid,
          message: action.payload.message,
        },
      };
    case "validateLastname":
      return {
        ...state,
        lastname: {
          ...state.lastname,
          isValid: action.payload.isValid,
          message: action.payload.message,
        },
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
    case "resetValidation":
      return {
        ...state,
        firstname: { ...state.firstname, isValid: true, message: "" },
        lastname: { ...state.lastname, isValid: true, message: "" },
        email: { ...state.email, isValid: true, message: "" },
        password: { ...state.password, isValid: true, message: "" },
      };
    default:
      return state;
  }
};

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerState, registerDispatch] = useReducer(reducer, initialState);

  const registerHandler = () => {
    registerDispatch({ type: "resetValidation" });
    dispatch(
      signup(
        {
          firstname: registerState.firstname.value,
          lastname: registerState.lastname.value,
          password: registerState.password.value,
          email: registerState.email.value,
        },
        navigate,
        {
          firstname: (isValid, message) =>
            registerDispatch({
              type: "validateFirstname",
              payload: { isValid, message },
            }),
          lastname: (isValid, message) =>
            registerDispatch({
              type: "validateLastname",
              payload: { isValid, message },
            }),
          email: (isValid, message) =>
            registerDispatch({
              type: "validateEmail",
              payload: { isValid, message },
            }),
          password: (isValid, message) =>
            registerDispatch({
              type: "validatePassword",
              payload: { isValid, message },
            }),
        }
      )
    );
  };

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
          <CardHeader title="Register" align="center" />
          <CardContent sx={{ flexGrow: 1 }}>
            <Stack
              component="form"
              spacing={2}
              noValidate
              autoComplete="off"
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                id="firstname"
                label="First Name"
                type="text"
                variant="outlined"
                onChange={(e) =>
                  registerDispatch({
                    type: "setFirstname",
                    payload: e.target.value,
                  })
                }
                value={registerState.firstname.value}
                fullWidth={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleSharp />
                    </InputAdornment>
                  ),
                }}
                error={!registerState.firstname.isValid}
                helperText={registerState.firstname.message}
              />
              <TextField
                id="lastname"
                label="Last Name"
                type="text"
                variant="outlined"
                onChange={(e) =>
                  registerDispatch({
                    type: "setLastname",
                    payload: e.target.value,
                  })
                }
                value={registerState.lastname.value}
                fullWidth={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleSharp />
                    </InputAdornment>
                  ),
                }}
                error={!registerState.lastname.isValid}
                helperText={registerState.lastname.message}
              />
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                onChange={(e) =>
                  registerDispatch({
                    type: "setEmail",
                    payload: e.target.value,
                  })
                }
                value={registerState.email.value}
                fullWidth={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailSharp />
                    </InputAdornment>
                  ),
                }}
                error={!registerState.email.isValid}
                helperText={registerState.email.message}
              />
              <TextField
                id="password"
                label="Password"
                type={registerState.isShowPassword ? "text" : "password"}
                variant="outlined"
                onChange={(e) =>
                  registerDispatch({
                    type: "setPassword",
                    payload: e.target.value,
                  })
                }
                value={registerState.password.value}
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
                          registerDispatch({
                            type: "showPassword",
                            payload: !registerState.isShowPassword,
                          })
                        }
                      >
                        {registerState.isShowPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!registerState.password.isValid}
                helperText={registerState.password.message}
              />
              <Button
                variant="contained"
                size="large"
                onClick={registerHandler}
                fullWidth
              >
                SIGNUP
              </Button>
              <Divider sx={{ width: "100%" }} />
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/signin")}
                fullWidth
              >
                Already have an Account?
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default RegisterPage;
