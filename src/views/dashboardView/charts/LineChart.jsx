import Chart from "react-apexcharts";
import { DateTime } from "luxon";
import { memo, useMemo } from "react";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";

const LineChart = ({ readings, seconds }) => {
  const data = useMemo(
    () =>
      readings[seconds]
        ? [
            { name: "X", data: readings[seconds].rawX },
            { name: "Y", data: readings[seconds].rawY },
            { name: "Z", data: readings[seconds].rawZ },
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
              Raw Reading Snapshot
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
                  categories: readings[seconds].rawDatetime.map((stamp) =>
                    DateTime.fromISO(stamp)
                      .setZone("Asia/Manila")
                      .toFormat("ss' sec. 'SSS' ms.'")
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

export default memo(LineChart);
