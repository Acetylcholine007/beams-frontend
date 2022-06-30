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
        const datetimeChunk = data.rawDatetime.slice(
          subChunkSize * index,
          subChunkSize * index + subChunkSize
        );
        const xChunk = data.rawX.slice(
          subChunkSize * index,
          subChunkSize * index + subChunkSize
        );
        const yChunk = data.rawY.slice(
          subChunkSize * index,
          subChunkSize * index + subChunkSize
        );
        const zChunk = data.rawZ.slice(
          subChunkSize * index,
          subChunkSize * index + subChunkSize
        );
        dispatch(
          dashboardActions.setRealTimeRawReadings({
            x: datetimeChunk.map((date, i) => ({ x: date, y: xChunk[i] })),
            y: datetimeChunk.map((date, i) => ({ x: date, y: yChunk[i] })),
            z: datetimeChunk.map((date, i) => ({ x: date, y: zChunk[i] })),
          })
        );
      },
      1000 / subChunkSize + offset,
      mainChunkSize / subChunkSize
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
