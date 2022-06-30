import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../shared/hooks/useSocket";
import { fetchNode } from "../../../store/actions/dashboardActions";
import RawChartSegment from "../chartSegments/RawChartSegment";
import FFTChartSegment from "../chartSegments/FFTChartSegment";
import { dashboardActions } from "../../../store/slices/DashboardSlice";
import NodeEditorDialog from "../components/NodeEditorDialog";
import NodeDetailsToolBar from "../components/NodeDetailsToolBar";

const subChunkSize = 10;
const mainChunkSize = 100;
const offset = -10;

const NodeDetailsPage = () => {
  const { token } = useSelector((state) => state.auth);
  const { snapshots, structure, node, datetime } = useSelector(
    (state) => state.dashboard
  );
  const [isShowDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNode(node._id));
  }, []);

  function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {
      callback(x);

      if (++x === repetitions) {
        window.clearInterval(intervalID);
      }
    }, delay);
  }

  const socketHandler = (data) => {
    setIntervalX(
      (index) => {
        dispatch(
          dashboardActions.setRealTimeRawReadings2({
            rawDatetime: data.rawDatetime.slice(
              subChunkSize * index,
              subChunkSize * index + subChunkSize
            ),
            rawX: data.rawX.slice(
              subChunkSize * index,
              subChunkSize * index + subChunkSize
            ),
            rawY: data.rawY.slice(
              subChunkSize * index,
              subChunkSize * index + subChunkSize
            ),
            rawZ: data.rawZ.slice(
              subChunkSize * index,
              subChunkSize * index + subChunkSize
            ),
          })
        );
      },
      1000 / subChunkSize + offset,
      mainChunkSize / subChunkSize
    );

    dispatch(dashboardActions.setRealTimeFFTReadings2(data));
  };

  useSocket(node.serialKey, socketHandler);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <NodeDetailsToolBar
        setShowDialog={setShowDialog}
        token={token}
        snapshots={snapshots}
        structure={structure}
        node={node}
        datetime={datetime}
      />
      <Box sx={{ p: 2, overflowY: "auto", flexGrow: 1 }}>
        <Container>
          <Grid container spacing={2}>
            <RawChartSegment />
            <FFTChartSegment />
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
