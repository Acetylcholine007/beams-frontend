import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CardActionArea, Stack, TextField, Tooltip } from "@mui/material";
import { saveStructure } from "../../../store/actions/dashboardActions";
import ImagePickerDialog from "../../../shared/components/ImagePickerDialog";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

const StructureEditorDialog = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [isShowImagePicker, setShowImagePicker] = useState(false);
  const { structure } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (structure) {
      setName(structure.name);
      setDescription(structure.description);
      setLocation(structure.location);
      setImageUri(structure.imageUri);
    } else {
      setName("");
      setDescription("");
      setLocation("");
      setImageUri("");
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
      <Tooltip title="Structure Image">
        <CardActionArea onClick={() => setShowImagePicker(true)}>
          <Box
            sx={{
              height: "10rem",
              position: "relative",
              backgroundColor: theme.palette.primary.dark,
              backgroundSize: imageUri !== "" ? "cover" : "initial",
              backgroundImage:
                imageUri !== ""
                  ? `url(${imageUri})`
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
            label="Structure Location"
            type="text"
            variant="outlined"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            fullWidth={true}
            error={false}
            helperText={false ? "Structure location required" : null}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(
              saveStructure(
                structure === null,
                {
                  _id: structure ? structure._id : null,
                  name,
                  description,
                  location,
                  imageUri,
                },
                navigate
              )
            );
            handleClose();
          }}
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
      <ImagePickerDialog
        open={isShowImagePicker}
        handleClose={() => setShowImagePicker(false)}
        saveHandler={(image) => setImageUri(image)}
        imageUri={imageUri}
      />
    </Dialog>
  );
};

export default memo(StructureEditorDialog);
