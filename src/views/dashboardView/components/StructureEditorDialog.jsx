import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Stack,
  TextField,
} from "@mui/material";
import { saveNode } from "../../../store/actions/dashboardActions";

export default function StructureEditorDialog({ open, handleClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");
  const { structure } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    if (structure) {
      setName(structure.name);
      setDescription(structure.description);
      setImageUri(structure.imagesUri);
    } else {
      setName("");
      setDescription("");
      setImageUri([]);
    }
  }, [open]);

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
      <DialogContent>
        <Stack spacing={2} sx={{paddingTop: 2}}>
          <TextField
            label="Structure Name"
            type="text"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            value={name}
            fullWidth={true}
            error={false}
            helperText={false ? "Structure name required" : null}
          />
          <TextField
            label="Structure Description"
            type="text"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            fullWidth={true}
            error={false}
            helperText={false ? "Structure description required" : null}
          />
          <TextField
            label="Structure Image URI"
            type="text"
            variant="outlined"
            onChange={(e) => setImageUri(e.target.value)}
            value={imageUri}
            fullWidth={true}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            dispatch(saveNode());
            handleClose();
          }}
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
