import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const PasswordResetDialog = ({ open, handleClose, handleSubmit }) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail("");
  }, [open]);
  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Password Reset</DialogTitle>
      <DialogContent>
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fullWidth={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit(email)}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordResetDialog;
