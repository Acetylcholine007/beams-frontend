import { Container, Grid, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useSocket } from "../../../shared/hooks/useSocket";
import { useNavigate } from "react-router-dom";
import { fetchNode } from "../../../store/actions/dashboardActions";
import RawChart from "../charts/RawChart";
import FFTChart from "../charts/FFTChart";
import { dashboardActions } from "../../../store/slices/DashboardSlice";

const NodeDetailsPage = () => {
  const { node, readings } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchNode(node._id));
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
    <Container>
      <Grid container spacing={2}>
        <RawChart />
        <FFTChart />
      </Grid>
    </Container>
  );
};

export default NodeDetailsPage;
