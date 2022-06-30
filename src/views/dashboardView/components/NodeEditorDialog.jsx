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

const NodeEditorDialog = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [serialKey, setSerialKey] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [isShowImagePicker, setShowImagePicker] = useState(false);
  const { node, structure } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    if (node) {
      setSerialKey(node.serialKey);
      setName(node.name);
      setDescription(node.description);
      setImageUri(node.imageUri);
    } else {
      setSerialKey("");
      setName("");
      setDescription("");
      setImageUri("");
    }
  }, [open]);

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
              backgroundSize: imageUri !== "" ? "cover" : "initial",
              backgroundImage:
                imageUri !== ""
                  ? `url(${imageUri})`
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
            onChange={(e) => setSerialKey(e.target.value)}
            value={serialKey}
            fullWidth={true}
            error={false}
            helperText={false ? "Serial Key required" : null}
          />
          <TextField
            label="Node Name"
            type="text"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            value={name}
            fullWidth={true}
            error={false}
            helperText={false ? "Node name required" : null}
          />
          <TextField
            label="Node Description"
            type="text"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            fullWidth={true}
            error={false}
            helperText={false ? "Node description required" : null}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            dispatch(
              saveNode(node === null, {
                _id: node ? node._id : null,
                name,
                description,
                serialKey,
                imageUri,
                structure: node ? node.structure : structure._id,
              })
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

export default memo(NodeEditorDialog);
