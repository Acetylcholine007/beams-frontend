import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { memo, useMemo } from "react";
import Chart from "react-apexcharts";

const FrequencyChart = ({ readings, seconds }) => {
  const data = useMemo(
    () =>
      readings[seconds]
        ? [
            { name: "X", data: readings[seconds].fftX },
            { name: "Y", data: readings[seconds].fftY },
            { name: "Z", data: readings[seconds].fftZ },
          ]
        : [
            { name: "X", data: [] },
            { name: "Y", data: [] },
            { name: "Z", data: [] },
          ],
    [readings, seconds]
  );

  return (
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
            <Chart
              options={{
                chart: {
                  id: "basic-bar",
                },
                xaxis: {
                  categories: readings[seconds].fftFrequency.map(
                    (value) => `${value} Hz`
                  ),
                },
                yaxis: {
                  labels: {
                    formatter: (val) => `${val.toFixed(2)} g`,
                  },
                  title: { text: "Acceleration" },
                },
                stroke: {
                  curve: "straight",
                },
              }}
              series={data}
              type="line"
              height="100%"
              width="100%"
            />
          )}
          {!readings[seconds] && (
            <Chart
              options={{
                chart: {
                  id: "basic-bar",
                },
                xaxis: {
                  categories: [],
                },
                yaxis: {
                  labels: {
                    formatter: (val) => val.toFixed(2),
                  },
                  title: { text: "Amplitude" },
                },
                stroke: {
                  curve: "smooth",
                },
              }}
              series={data}
              type="line"
              height="100%"
              width="100%"
            />
          )}
          {!readings && <CircularProgress sx={{ alignSelf: "center" }} />}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default memo(FrequencyChart);
