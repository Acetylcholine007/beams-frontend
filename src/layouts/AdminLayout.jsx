import { useState } from "react";
import {
  Alert,
  AppBar,
  Box,
  Button,
  ButtonBase,
  CssBaseline,
  Divider,
  Drawer,
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { feedbackActions } from "../store/slices/FeedbackSlice";
import { Logout, Menu } from "@mui/icons-material";
import AdminRoutes, {
  adminRouteAuth,
  adminRoutes,
} from "../routes/AdminRoutes";
import { logout } from "../store/actions/authActions";

const drawerWidth = 240;

function AdminLayout({ window }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        Project BEAMS
      </Typography>
      <Divider />
      <List>
        {adminRoutes.map((route) => (
          <ListItem key={route.title} disablePadding>
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText primary={route.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "flex-end",
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton
              sx={{ textAlign: "left" }}
              onClick={() => dispatch(logout(navigate))}
            >
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const dispatch = useDispatch();
  const { firstname, lastname } = useSelector((state) => state.auth);
  const feedbackParams = useSelector((state) => state.feedback);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <ButtonBase onClick={() => navigate("/")} sx={{ p: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Project BEAMS
            </Typography>
          </ButtonBase>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              sx={{ color: "#fff" }}
              onClick={() => dispatch(logout(navigate))}
            >
              Sign Out
            </Button>
          </Box>
        </Toolbar>
        {feedbackParams.isLoading && <LinearProgress />}
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            zIndex: 0,
          }}
        >
          <AdminRoutes />
        </Box>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={feedbackParams.isShowSnackbar}
          autoHideDuration={feedbackParams.snackbarDuration}
          onClose={() => dispatch(feedbackActions.closeNotification())}
        >
          <Alert
            onClose={() => dispatch(feedbackActions.closeNotification())}
            severity={feedbackParams.severity}
            variant="filled"
          >
            {feedbackParams.snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default AdminLayout;
