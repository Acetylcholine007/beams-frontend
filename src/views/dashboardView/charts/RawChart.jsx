import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import LineChart from "../../../shared/components/LineChart";
import RealTimeRawChart from "../../../shared/components/RealTimeRawChart";

const RawChart = () => {
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
              <LineChart
                data={[
                  { name: "X", data: readings[seconds].rawX },
                  { name: "Y", data: readings[seconds].rawY },
                  { name: "Z", data: readings[seconds].rawZ },
                ]}
                xAxis={readings[seconds].rawDatetime}
              />
            )}
            {!readings[seconds] && (
              <LineChart
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

export default RawChart;
