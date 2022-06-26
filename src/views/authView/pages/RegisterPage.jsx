import {
  AccountCircleSharp,
  AlternateEmailSharp,
  LocationOnSharp,
  LockSharp,
  PhoneSharp,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../store/actions/authActions";

const initialState = {
  firstname: "",
  lastname: "",
  password: "",
  email: "",
  isShowPassword: false,
  isShowProfilePicker: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "firstname":
      return { ...state, firstname: action.payload };
    case "lastname":
      return { ...state, lastname: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "showPassword":
      return { ...state, isShowPassword: action.payload };
    default:
      return state;
  }
};

const RegisterPage = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerState, registerDispatch] = useReducer(reducer, initialState);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Register</DialogTitle>
      <DialogContent>
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
              registerDispatch({ type: "firstname", payload: e.target.value })
            }
            value={registerState.firstname}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleSharp />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="lastname"
            label="Last Name"
            type="text"
            variant="outlined"
            onChange={(e) =>
              registerDispatch({ type: "lastname", payload: e.target.value })
            }
            value={registerState.lastname}
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleSharp />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e) =>
              registerDispatch({ type: "email", payload: e.target.value })
            }
            value={registerState.email}
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
            id="password"
            label="Password"
            type={registerState.isShowPassword ? "text" : "password"}
            variant="outlined"
            onChange={(e) =>
              registerDispatch({ type: "password", payload: e.target.value })
            }
            value={registerState.password}
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
                        type: "isShowPassword",
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
          />
          <Button
            variant="contained"
            size="large"
            onClick={() =>
              dispatch(
                signup(
                  {
                    firstname: registerState.firstname,
                    lastname: registerState.lastname,
                    password: registerState.password,
                    email: registerState.email,
                  },
                  navigate
                )
              )
            }
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
      </DialogContent>
    </Dialog>
  );
};

export default RegisterPage;
