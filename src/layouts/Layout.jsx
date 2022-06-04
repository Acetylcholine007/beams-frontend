import { useContext, useState } from "react";
import {
  Alert,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import NodesPage from "../views/dashboardView/pages/NodesPage";
import NodeDetailsPage from "../views/dashboardView/pages/NodeDetailsPage";
import SettingsPage from "../views/settingsView/pages/SettingsPage";
import NotFoundPage from "../shared/pages/NotFoundPage";
import { SnackbarContext } from "../shared/contexts/SnackbarContext";
import { LoadingContext } from "../shared/contexts/LoadingContext";
import { styled, useTheme } from "@mui/material/styles";
import {
  ChevronLeft,
  ChevronRight,
  Sensors,
  Settings,
  Menu,
} from "@mui/icons-material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Layout() {
  const { loadingParams } = useContext(LoadingContext);
  const { snackbarParams, snackbarDispatch } = useContext(SnackbarContext);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            MProject BEAMS
          </Typography>
        </Toolbar>
        {loadingParams.isOpen && <LinearProgress />}
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Sensors />
                </ListItemIcon>
                <ListItemText
                  primary={"Nodes"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/settings")}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Settings />
                </ListItemIcon>
                <ListItemText
                  primary={"Settings"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DrawerHeader />
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        >
          <Routes>
            <Route path="/" element={<NodesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/:nodeId" element={<NodeDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>
        <Snackbar
          anchorOrigin={{
            vertical: snackbarParams.vertical,
            horizontal: snackbarParams.horizontal,
          }}
          open={snackbarParams.isOpen}
          autoHideDuration={snackbarParams.duration}
          onClose={() => snackbarDispatch({ type: "SET_SHOW", payload: false })}
        >
          <Alert
            onClose={() =>
              snackbarDispatch({ type: "SET_SHOW", payload: false })
            }
            severity={snackbarParams.severity}
            variant="filled"
          >
            {snackbarParams.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default Layout;
