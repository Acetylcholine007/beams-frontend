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
import FrequencyChart from "../../../shared/components/FrequencyChart";
import RealTimeFFTChart from "../../../shared/components/RealTimeFFTChart";

const FFTChart = () => {
  const { readings, seconds } = useSelector((state) => state.dashboard);

  return (
    <>
      <Grid item xs={12} md={6}>
        <Card
          elevation={4}
          sx={{
            height: "40rem",
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
            {readings && <RealTimeFFTChart />}
            {!readings && <CircularProgress sx={{ alignSelf: "center" }} />}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card
          elevation={4}
          sx={{
            height: "40rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardHeader
            title={
              <Typography variant="h6" color="white">
                FFT Reading Snapshot
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
            {readings[seconds] && (
              <FrequencyChart
                data={[
                  { name: "X", data: readings[seconds].fftX },
                  { name: "Y", data: readings[seconds].fftY },
                  { name: "Z", data: readings[seconds].fftZ },
                ]}
                xAxis={readings[seconds].fftFrequency}
              />
            )}
            {!readings[seconds] && (
              <FrequencyChart
                data={[
                  { name: "X", data: [] },
                  { name: "Y", data: [] },
                  { name: "Z", data: [] },
                ]}
                xAxis={[]}
              />
            )}
            {!readings && <CircularProgress sx={{ alignSelf: "center" }} />}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default FFTChart;
