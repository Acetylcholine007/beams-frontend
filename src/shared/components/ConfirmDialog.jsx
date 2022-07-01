import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText } from "@mui/material";
import { memo } from "react";

const ConfirmDialog = ({ open, handleClose, callback, title, message }) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={callback} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ConfirmDialog);
