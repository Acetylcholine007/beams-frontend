import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchStructures } from "../../../store/actions/dashboardActions";
import { dashboardActions } from "../../../store/slices/DashboardSlice";

const HomePage = () => {
  const { structures, structureQuery, structurePage, structureQueryTarget } =
    useSelector((state) => state.dashboard);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchStructures("", 1, ""));
  }, [structureQuery, structurePage, structureQueryTarget]);

  return (
    <Container>
      <Grid container>
        {structures &&
          structures.map((structure) => (
            <Grid item xs={12} md={4} key={structure._id}>
              <Card
                align="center"
                onClick={() => {
                  dispatch(dashboardActions.setSelectedStructure(structure));
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
                      <Typography variant="h6">
                        {structure.nodes.length}
                      </Typography>
                      <Typography variant="caption">Nodes</Typography>
                    </Avatar>
                  </Box>
                  <CardHeader
                    title={structure.name}
                    subheader={structure.description}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
