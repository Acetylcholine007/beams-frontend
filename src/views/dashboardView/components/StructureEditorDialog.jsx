import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CardActionArea, Stack, TextField, Tooltip } from "@mui/material";
import { saveStructure } from "../../../store/actions/dashboardActions";
import ImagePickerDialog from "../../../shared/components/ImagePickerDialog";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

const initialState = {
  name: { value: "", isValid: true, message: "" },
  description: { value: "", isValid: true, message: "" },
  location: { value: "", isValid: true, message: "" },
  imageUri: { value: "", isValid: true, message: "" },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setName":
      return { ...state, name: { ...state.name, value: action.payload } };
    case "setDescription":
      return {
        ...state,
        description: { ...state.description, value: action.payload },
      };
    case "setLocation":
      return {
        ...state,
        location: { ...state.location, value: action.payload },
      };
    case "setImageUri":
      return {
        ...state,
        imageUri: { ...state.imageUri, value: action.payload },
      };
    case "validateName":
      return {
        ...state,
        name: {
          ...state.name,
          isValid: action.payload.isValid,
          message: action.payload.message,
        },
      };
    case "validateDescription":
      return {
        ...state,
        description: {
          ...state.description,
          isValid: action.payload.isValid,
          message: action.payload.message,
        },
      };
    case "validateLocation":
      return {
        ...state,
        location: {
          ...state.location,
          isValid: action.payload.isValid,
          message: action.payload.message,
        },
      };
    case "validateImageUri":
      return {
        ...state,
        imageUri: {
          ...state.imageUri,
          isValid: action.payload.isValid,
          message: action.payload.message,
        },
      };
    case "resetValidation":
      return {
        ...state,
        name: { ...state.name, isValid: true, message: "" },
        location: { ...state.location, isValid: true, message: "" },
        description: { ...state.description, isValid: true, message: "" },
        imageUri: { ...state.imageUri, isValid: true, message: "" },
      };
    default:
      return state;
  }
};

const StructureEditorDialog = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [structureState, structureDispatch] = useReducer(reducer, initialState);
  const [isShowImagePicker, setShowImagePicker] = useState(false);
  const { structure } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (structure) {
      structureDispatch({ type: "setName", payload: structure.name });
      structureDispatch({
        type: "setDescription",
        payload: structure.description,
      });
      structureDispatch({ type: "setLocation", payload: structure.location });
      structureDispatch({ type: "setImageUri", payload: structure.imageUri });
    } else {
      structureDispatch({ type: "setName", payload: "" });
      structureDispatch({ type: "setDescription", payload: "" });
      structureDispatch({ type: "setLocation", payload: "" });
      structureDispatch({ type: "setImageUri", payload: "" });
    }
    structureDispatch({ type: "resetValidation" });
  }, [open]);

  const saveHandler = () => {
    structureDispatch({ type: "resetValidation" });
    dispatch(
      saveStructure(
        structure === null,
        {
          _id: structure ? structure._id : null,
          name: structureState.name.value,
          description: structureState.description.value,
          location: structureState.location.value,
          imageUri: structureState.imageUri.value,
        },
        navigate,
        {
          name: (isValid, message) =>
            structureDispatch({
              type: "validateName",
              payload: { isValid, message },
            }),
          location: (isValid, message) =>
            structureDispatch({
              type: "validateLocation",
              payload: { isValid, message },
            }),
          description: (isValid, message) =>
            structureDispatch({
              type: "validateDescription",
              payload: { isValid, message },
            }),
        },
        handleClose
      )
    );
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Structure Editor</DialogTitle>
      <Tooltip title="Structure Image">
        <CardActionArea onClick={() => setShowImagePicker(true)}>
          <Box
            sx={{
              height: "10rem",
              position: "relative",
              backgroundColor: theme.palette.primary.dark,
              backgroundSize:
                structureState.imageUri.value !== "" ? "cover" : "initial",
              backgroundImage:
                structureState.imageUri.value !== ""
                  ? `url(${structureState.imageUri.value})`
                  : `url(
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%233f93d1' fill-opacity='0.6'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E"
              )`,
            }}
          />
        </CardActionArea>
      </Tooltip>
      <DialogContent>
        <Stack spacing={2} sx={{ paddingTop: 2 }}>
          <TextField
            label="Structure Name"
            type="text"
            variant="outlined"
            onChange={(e) =>
              structureDispatch({ type: "setName", payload: e.target.value })
            }
            value={structureState.name.value}
            fullWidth={true}
            error={!structureState.name.isValid}
            helperText={structureState.name.message}
          />
          <TextField
            label="Structure Description"
            type="text"
            variant="outlined"
            onChange={(e) =>
              structureDispatch({
                type: "setDescription",
                payload: e.target.value,
              })
            }
            value={structureState.description.value}
            fullWidth={true}
            error={!structureState.description.isValid}
            helperText={structureState.description.message}
          />
          <TextField
            label="Structure Location"
            type="text"
            variant="outlined"
            onChange={(e) =>
              structureDispatch({
                type: "setLocation",
                payload: e.target.value,
              })
            }
            value={structureState.location.value}
            fullWidth={true}
            error={!structureState.location.isValid}
            helperText={structureState.location.message}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" onClick={saveHandler} autoFocus>
          Save
        </Button>
      </DialogActions>
      <ImagePickerDialog
        open={isShowImagePicker}
        handleClose={() => setShowImagePicker(false)}
        saveHandler={(image) =>
          structureDispatch({ type: "setImageUri", payload: image })
        }
        imageUri={structureState.imageUri.value}
      />
    </Dialog>
  );
};

export default memo(StructureEditorDialog);
