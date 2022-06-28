import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  Container,
  Grid,
  InputAdornment,
  InputBase,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchStructures } from "../../../store/actions/dashboardActions";
import { dashboardActions } from "../../../store/slices/DashboardSlice";
import SearchIcon from "@mui/icons-material/Search";
import StructureEditorDialog from "../components/StructureEditorDialog";
import { Add } from "@mui/icons-material";

const HomePage = () => {
  const { structures, structureQuery, structurePage, structureQueryTarget } =
    useSelector((state) => state.dashboard);
  const [isShowDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(
      fetchStructures(structureQuery, structurePage, structureQueryTarget)
    );
  }, [structureQuery, structurePage, structureQueryTarget]);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ backgroundColor: "primary.light" }}
      >
        <Toolbar sx={{ justifyContent: "flex-start" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={structureQuery ? structureQuery : "Search…"}
              inputProps={{ "aria-label": "search" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch(dashboardActions.setStructureQuery(e.target.value));
                }
              }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2, overflowY: "auto", flexGrow: 1 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card align="center" onClick={() => setShowDialog(true)}>
                <CardActionArea>
                  <Box
                    sx={{
                      marginBottom: "2rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "10rem",
                      position: "relative",
                      backgroundColor: theme.palette.primary.dark,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%233f93d1' fill-opacity='0.6'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  >
                    <Avatar
                      sx={{
                        border: "2px solid white",
                        height: "5rem",
                        width: "5rem",
                        position: "absolute",
                        bottom: "-2rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "secondary.main",
                      }}
                    >
                      <Add sx={{ transform: "scale(1.5)" }} />
                    </Avatar>
                  </Box>
                  <CardHeader
                    title={"Create New Structure"}
                    sx={{ height: "4rem" }}
                  />
                </CardActionArea>
              </Card>
            </Grid>
            {structures &&
              structures.map((structure) => (
                <Grid item xs={12} md={4} key={structure._id}>
                  <Card
                    align="center"
                    onClick={() => {
                      dispatch(
                        dashboardActions.setSelectedStructure(structure)
                      );
                      navigate(`/structures/${structure._id}`);
                    }}
                  >
                    <CardActionArea>
                      <Box
                        sx={{
                          marginBottom: "2rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "10rem",
                          position: "relative",
                          backgroundSize:
                            structure.imageUri !== "" ? "cover" : "initial",
                          backgroundColor: theme.palette.primary.dark,
                          backgroundImage:
                            structure.imageUri !== ""
                              ? `url(${structure.imageUri})`
                              : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%233f93d1' fill-opacity='0.6'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      >
                        <Avatar
                          sx={{
                            border: "2px solid white",
                            height: "5rem",
                            width: "5rem",
                            position: "absolute",
                            bottom: "-2rem",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "secondary.main",
                          }}
                        >
                          <Typography variant="h6">
                            {structure.nodes.length}
                          </Typography>
                          <Typography variant="caption">Nodes</Typography>
                        </Avatar>
                      </Box>
                      <CardHeader
                        title={structure.name}
                        subheader={`${structure.location}`}
                        sx={{ height: "4rem" }}
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </Box>
      <StructureEditorDialog
        open={isShowDialog}
        handleClose={() => setShowDialog(false)}
      />
    </Box>
  );
};

export default HomePage;
