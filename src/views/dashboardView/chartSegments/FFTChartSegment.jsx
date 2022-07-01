import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import FrequencyChart from "../charts/FrequencyChart";
import RealTimeFFTChart2 from "../charts/RealTimeFFTChart2";

const FFTChartSegment = () => {
  const { readings, seconds, realTimeFFTReadings2 } = useSelector(
    (state) => state.dashboard
  );

  return (
    <>
      <Grid item xs={12} md={6}>
        <Card
          elevation={4}
          sx={{
            height: "30rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardHeader
            title={
              <Typography variant="h6" color="white">
                Realtime FFT Accelerometer Readings
              </Typography>
            }
            sx={{ backgroundColor: "primary.main" }}
          />
          <CardContent
            sx={{
              flexGrow: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {readings && (
              <RealTimeFFTChart2 realTimeFFTReadings2={realTimeFFTReadings2} />
            )}
            {!readings && <CircularProgress sx={{ alignSelf: "center" }} />}
          </CardContent>
        </Card>
      </Grid>
      <FrequencyChart readings={readings} seconds={seconds} />
    </>
  );
};

export default FFTChartSegment;
