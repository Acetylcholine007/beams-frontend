import { Business, Foundation } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  Chip,
  Container,
  Grid,
  Toolbar,
} from "@mui/material";
import { emphasize, styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import ConfirmDialog from "../../../shared/components/ConfirmDialog";
import { deleteStructure } from "../../../store/actions/dashboardActions";
import { dashboardActions } from "../../../store/slices/DashboardSlice";
import NodeEditorDialog from "../components/NodeEditorDialog";
import StructureEditorDialog from "../components/StructureEditorDialog";

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

const StructurePage = () => {
  const { token } = useSelector((state) => state.auth);
  const { structure } = useSelector((state) => state.dashboard);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowStructureDialog, setShowStructureDialog] = useState(false);
  const [isShowNodeDialog, setShowNodeDialog] = useState(false);
  const [isShowConfirmDialog, setShowConfirmDialog] = useState(false);

  const deleteHandler = useCallback(
    () => dispatch(deleteStructure(structure._id, navigate)),
    []
  );

  const handleConfirmClose = useCallback(() => setShowConfirmDialog(false), []);

  const handleStructureClose = useCallback(
    () => setShowStructureDialog(false),
    []
  );

  const handleNodeClose = useCallback(() => setShowNodeDialog(false), []);

  useEffect(() => {
    dispatch(dashboardActions.cleanNode());
  }, []);

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
            <StyledBreadcrumb
              label={structure.name}
              icon={<Business fontSize="small" />}
            />
          </Breadcrumbs>
          {token && (
            <>
              <Button
                variant="contained"
                sx={{ minWidth: "8rem", marginLeft: 2 }}
                onClick={() => setShowStructureDialog(true)}
              >
                Edit Structure
              </Button>
              <Button
                variant="contained"
                sx={{ minWidth: "8rem", marginLeft: 2 }}
                color="error"
                onClick={() => setShowConfirmDialog(true)}
              >
                Delete Structure
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2, overflowY: "auto", flexGrow: 1 }}>
        <Container>
          <Grid container spacing={2}>
            {token && (
              <Grid item xs={12} md={4}>
                <Card align="center" onClick={() => setShowNodeDialog(true)}>
                  <CardActionArea>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "10rem",
                        position: "relative",
                        backgroundColor: "success.light",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23404' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23505'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    ></Box>
                    <CardHeader
                      title="Create New Node"
                      sx={{ height: "4rem" }}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            )}
            {structure.nodes &&
              structure.nodes.map((node) => (
                <Grid item xs={12} md={4} key={node._id}>
                  <Card
                    align="center"
                    onClick={() => {
                      dispatch(dashboardActions.setSelectedNode(node));
                      navigate(
                        `/structures/${structure._id}/nodes/${node._id}`
                      );
                    }}
                  >
                    <CardActionArea>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "10rem",
                          position: "relative",
                          backgroundSize:
                            node.imageUri !== "" ? "cover" : "initial",
                          backgroundColor: "success.light",
                          backgroundImage:
                            node.imageUri !== ""
                              ? `url(${node.imageUri})`
                              : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23404' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23505'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></Box>
                      <CardHeader
                        title={node.name}
                        subheader={`Serial Key: ${node.serialKey}`}
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
        open={isShowStructureDialog}
        handleClose={handleStructureClose}
      />
      <NodeEditorDialog open={isShowNodeDialog} handleClose={handleNodeClose} />
      <ConfirmDialog
        open={isShowConfirmDialog}
        handleClose={handleConfirmClose}
        callback={deleteHandler}
        title="Delete Structure"
        message="Are you sure you want to delete this structure and its nodes?"
      />
    </Box>
  );
};

export default StructurePage;
