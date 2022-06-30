import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  CardActionArea,
  CardMedia,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { saveNode } from "../../../store/actions/dashboardActions";
import ImagePickerDialog from "../../../shared/components/ImagePickerDialog";
import { memo } from "react";

const initialState = {
  name: { value: "", isValid: true, message: "" },
  description: { value: "", isValid: true, message: "" },
  serialKey: { value: "", isValid: true, message: "" },
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
    case "setSerialKey":
      return {
        ...state,
        serialKey: { ...state.serialKey, value: action.payload },
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
    case "validateSerialKey":
      return {
        ...state,
        serialKey: {
          ...state.serialKey,
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
        serialKey: { ...state.serialKey, isValid: true, message: "" },
        description: { ...state.description, isValid: true, message: "" },
        imageUri: { ...state.imageUri, isValid: true, message: "" },
      };
    default:
      return state;
  }
};

const NodeEditorDialog = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [nodeState, nodeDispatch] = useReducer(reducer, initialState);
  const [isShowImagePicker, setShowImagePicker] = useState(false);
  const { node, structure } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    if (node) {
      nodeDispatch({ type: "setName", payload: node.name });
      nodeDispatch({
        type: "setDescription",
        payload: node.description,
      });
      nodeDispatch({ type: "setSerialKey", payload: node.serialKey });
      nodeDispatch({ type: "setImageUri", payload: node.imageUri });
    } else {
      nodeDispatch({ type: "setName", payload: "" });
      nodeDispatch({ type: "setDescription", payload: "" });
      nodeDispatch({ type: "setSerialKey", payload: "" });
      nodeDispatch({ type: "setImageUri", payload: "" });
    }
    nodeDispatch({ type: "resetValidation" });
  }, [open]);

  const saveHandler = () => {
    nodeDispatch({ type: "resetValidation" });
    dispatch(
      saveNode(
        node === null,
        {
          _id: node ? node._id : null,
          name: nodeState.name.value,
          description: nodeState.description.value,
          serialKey: nodeState.serialKey.value,
          imageUri: nodeState.imageUri.value,
          structure: node ? node.structure : structure._id,
        },
        {
          name: (isValid, message) =>
            nodeDispatch({
              type: "validateName",
              payload: { isValid, message },
            }),
          serialKey: (isValid, message) =>
            nodeDispatch({
              type: "validateSerialKey",
              payload: { isValid, message },
            }),
          description: (isValid, message) =>
            nodeDispatch({
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
      open={open}
      fullWidth={true}
      maxWidth="xs"
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Node Editor</DialogTitle>
      <Tooltip title="Node Image">
        <CardActionArea onClick={() => setShowImagePicker(true)}>
          <Box
            sx={{
              height: "10rem",
              position: "relative",
              backgroundColor: "success.light",
              backgroundSize:
                nodeState.imageUri.value !== "" ? "cover" : "initial",
              backgroundImage:
                nodeState.imageUri.value !== ""
                  ? `url(${nodeState.imageUri.value})`
                  : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23404' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23505'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </CardActionArea>
      </Tooltip>
      <DialogContent>
        <Stack spacing={2} sx={{ paddingTop: 2 }}>
          <TextField
            label="Node Serial Key"
            type="text"
            variant="outlined"
            onChange={(e) =>
              nodeDispatch({
                type: "setSerialKey",
                payload: e.target.value,
              })
            }
            value={nodeState.serialKey.value}
            fullWidth={true}
            error={!nodeState.serialKey.isValid}
            helperText={nodeState.serialKey.message}
          />
          <TextField
            label="Node Name"
            type="text"
            variant="outlined"
            onChange={(e) =>
              nodeDispatch({ type: "setName", payload: e.target.value })
            }
            value={nodeState.name.value}
            fullWidth={true}
            error={!nodeState.name.isValid}
            helperText={nodeState.name.message}
          />
          <TextField
            label="Node Description"
            type="text"
            variant="outlined"
            onChange={(e) =>
              nodeDispatch({
                type: "setDescription",
                payload: e.target.value,
              })
            }
            value={nodeState.description.value}
            fullWidth={true}
            error={!nodeState.description.isValid}
            helperText={nodeState.description.message}
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
          nodeDispatch({ type: "setImageUri", payload: image })
        }
        imageUri={nodeState.imageUri.value}
      />
    </Dialog>
  );
};

export default memo(NodeEditorDialog);
