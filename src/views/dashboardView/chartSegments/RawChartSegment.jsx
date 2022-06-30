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
import RealTimeRawChart2 from "../charts/RealTimeRawChart2";

const RawChartSegment = () => {
  const { readings, seconds, realTimeRawReadings2 } = useSelector(
    (state) => state.dashboard
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
            {readings && (
              <RealTimeRawChart2 realTimeRawReadings2={realTimeRawReadings2} />
            )}
            {!readings && <CircularProgress sx={{ alignSelf: "center" }} />}
          </CardContent>
        </Card>
      </Grid>
      <LineChart readings={readings} seconds={seconds} />
    </>
  );
};

export default RawChartSegment;
