import {
  AppBar,
  Breadcrumbs,
  Button,
  Chip,
  Divider,
  IconButton,
  Slider,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { emphasize, styled } from "@mui/material/styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { fetchReadings } from "../../../store/actions/dashboardActions";
import { dashboardActions } from "../../../store/slices/DashboardSlice";
import { Link } from "react-router-dom";
import { Business, Foundation, Search, Sensors } from "@mui/icons-material";
import { useEffect } from "react";
import { memo } from "react";

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

const NodeDetailsToolBar = ({
  setShowDialog,
  setShowConfirmDialog,
  token,
  snapshots,
  structure,
  node,
  datetime,
  seconds,
}) => {
  const [localSeconds, setLocalSeconds] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setLocalSeconds(seconds);
  }, [datetime]);

  return (
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
                <TextField size="small" {...props} sx={{ minWidth: "20rem" }} />
              )}
              value={datetime}
              onChange={(newValue) => {
                dispatch(dashboardActions.setDatetime(newValue.toString()));
              }}
              onChangeCommitted={(newValue) => console.log(">>>>>>>>>")}
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
              max={snapshots > 0 ? snapshots - 1 : 0}
              value={localSeconds}
              onChange={(e, val) => setLocalSeconds(val)}
              onChangeCommitted={(e, val) =>
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
        {token && (
          <>
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
              onClick={() => setShowConfirmDialog(true)}
            >
              Delete Node
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default memo(NodeDetailsToolBar);
