import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useState } from "react";

export default function ImagePickerDialog({
  open,
  handleClose,
  saveHandler,
  imageUri,
}) {
  const [profileUri, setProfileUri] = useState(imageUri);
  const [error, setError] = useState(false);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Image Picker
      </DialogTitle>
      <DialogContent>
        <TextField
          value={profileUri}
          size="small"
          placeholder="Profile image URL"
          error={error}
          fullWidth
          onChange={(e) => setProfileUri(e.target.value)}
          helperText={error ? "Not valid Image URI" : null}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setError(false);
            saveHandler(profileUri);
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
