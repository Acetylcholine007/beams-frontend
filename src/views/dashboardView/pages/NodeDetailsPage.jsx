import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Slider,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { useSocket } from "../../../shared/hooks/useSocket";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  deleteNode,
  fetchNode,
  fetchReadings,
} from "../../../store/actions/dashboardActions";
import { emphasize, styled } from "@mui/material/styles";
import RawChart from "../charts/RawChart";
import FFTChart from "../charts/FFTChart";
import { dashboardActions } from "../../../store/slices/DashboardSlice";
import NodeEditorDialog from "../components/NodeEditorDialog";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Business, Foundation, Search, Sensors } from "@mui/icons-material";

const NodeDetailsPage = () => {
  const { snapshots, structure, node, datetime, seconds } = useSelector(
    (state) => state.dashboard
  );
  const [isShowDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      "&:hover, &:focus": {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      "&:active": {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });

  useEffect(() => {
    dispatch(fetchNode(node._id));
    return () => dispatch(dashboardActions.cleanNode());
  }, []);

  const socketHandler = (data) => {
    dispatch(
      dashboardActions.setRealTimeRawReadings({
        x: data.rawDatetime.map((date, index) => ({
          x: date,
          y: data.rawX[index],
        })),
        y: data.rawDatetime.map((date, index) => ({
          x: date,
          y: data.rawY[index],
        })),
        z: data.rawDatetime.map((date, index) => ({
          x: date,
          y: data.rawZ[index],
        })),
      })
    );
    dispatch(
      dashboardActions.setRealTimeFFTReadings({
        x: data.fftFrequency.map((frequency, index) => ({
          x: frequency,
          y: data.fftX[index],
        })),
        y: data.fftFrequency.map((frequency, index) => ({
          x: frequency,
          y: data.fftY[index],
        })),
        z: data.fftFrequency.map((frequency, index) => ({
          x: frequency,
          y: data.fftZ[index],
        })),
      })
    );
  };

  useSocket(node.serialKey, socketHandler);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ backgroundColor: "primary.light" }}
      >
        <Toolbar>
          <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <StyledBreadcrumb
                label="Structures"
                icon={<Foundation fontSize="small" />}
                sx={{ cursor: "pointer" }}
              />
            </Link>
            <Link to={-1} style={{ textDecoration: "none" }}>
              <StyledBreadcrumb
                label={structure.name}
                icon={<Business fontSize="small" />}
                sx={{ cursor: "pointer" }}
              />
            </Link>
            <StyledBreadcrumb
              label={node.name}
              icon={<Sensors fontSize="small" />}
            />
          </Breadcrumbs>
          <IconButton
            onClick={() => {
              if (new Date(datetime) !== "Invalid Date") {
                console.log(datetime);
                dispatch(fetchReadings(datetime, node.serialKey));
              }
            }}
          >
            <Search />
          </IconButton>
          <Stack alignItems="center">
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <DateTimePicker
                renderInput={(props) => (
                  <TextField
                    size="small"
                    {...props}
                    sx={{ minWidth: "20rem" }}
                    endIcon
                  />
                )}
                value={datetime}
                onChange={(newValue) => {
                  dispatch(dashboardActions.setDatetime(newValue));
                }}
              />
            </LocalizationProvider>
            <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
              <Typography variant="caption" sx={{ paddingRight: "0.6rem" }}>
                Snapshots:{" "}
              </Typography>
              <Slider
                step={1}
                marks
                min={0}
                max={snapshots}
                value={seconds}
                onChange={(e, val) =>
                  dispatch(dashboardActions.setSeconds(val))
                }
                valueLabelDisplay="auto"
                sx={{
                  paddingTop: 1,
                  paddingBottom: 1,
                  "& .MuiSlider-thumb": {
                    height: "0.8rem",
                    width: "0.8rem",
                    padding: "0.2rem",
                  },
                }}
              />
            </Stack>
          </Stack>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginLeft: 2, marginRight: 2 }}
          />
          <Button
            variant="contained"
            sx={{ minWidth: "8rem" }}
            onClick={() => setShowDialog(true)}
          >
            Edit Node
          </Button>
          <Button
            variant="contained"
            sx={{ minWidth: "8rem", marginLeft: 2 }}
            color="error"
            onClick={() => dispatch(deleteNode(node._id, navigate))}
          >
            Delete Node
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2, overflowY: "auto", flexGrow: 1 }}>
        <Container>
          <Grid container spacing={2}>
            <RawChart />
            <FFTChart />
          </Grid>
        </Container>
      </Box>
      <NodeEditorDialog
        open={isShowDialog}
        handleClose={() => setShowDialog(false)}
      />
    </Box>
  );
};

export default NodeDetailsPage;
