import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import LineChart from "../charts/LineChart";
import RealTimeRawChart from "../charts/RealTimeRawChart";
import { useMemo } from "react";

const RawChartSegment = () => {
  const { readings, seconds } = useSelector((state) => state.dashboard);
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
    [readings]
  );

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
                Realtime Raw Accelerometer Readings
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
            {readings && <RealTimeRawChart />}
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
              <LineChart data={data} xAxis={readings[seconds].rawDatetime} />
            )}
            {!readings[seconds] && <LineChart data={data} xAxis={[]} />}
            {!readings && <CircularProgress sx={{ alignSelf: "center" }} />}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default RawChartSegment;
