import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNode } from "../../../controllers/nodeController";
import LineChart from "../../../shared/components/LineChart";

const NodeDetailsPage = () => {
  const { readings } = useNode();

  return (
    <Container sx={{ height: "100%" }}>
      <Box sx={{ height: "80%", display: "flex", flexDirection: "column" }}>
        <Stack
          direction="row"
          justifyContent="stretch"
          spacing={2}
          sx={{ height: "100%", paddingBottom: 2 }}
        >
          <Card
            elevation={4}
            sx={{
              height: "100%",
              flexBasis: "50%",
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
                <LineChart
                  data={[
                    { name: "X", data: readings.rawX },
                    { name: "Y", data: readings.rawY },
                    { name: "Z", data: readings.rawZ },
                  ]}
                  xAxis={readings.rawDatetime}
                  height={"100%"}
                  width={"100%"}
                />
              )}
              {!readings && <CircularProgress sx={{ alignSelf: "center" }} />}
            </CardContent>
          </Card>
          <Card
            elevation={4}
            sx={{
              height: "100%",
              flexBasis: "50%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardHeader
              title={
                <Typography variant="h6" color="white">
                  Accelerometer Raw Reading Snapshot
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
                <LineChart
                  data={[
                    { name: "X", data: readings.rawX },
                    { name: "Y", data: readings.rawY },
                    { name: "Z", data: readings.rawZ },
                  ]}
                  xAxis={readings.rawDatetime}
                  height={"100%"}
                  width={"100%"}
                />
              )}
              {!readings && <CircularProgress sx={{ alignSelf: "center" }} />}
            </CardContent>
          </Card>
        </Stack>
      </Box>
      <Box sx={{ height: "80%", display: "flex", flexDirection: "column" }}>
        <Stack
          direction="row"
          justifyContent="stretch"
          spacing={2}
          sx={{ height: "100%", paddingBottom: 2 }}
        >
          <Card
            elevation={4}
            sx={{
              height: "100%",
              flexBasis: "50%",
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
                <LineChart
                  data={[
                    { name: "X", data: readings.rawX },
                    { name: "Y", data: readings.rawY },
                    { name: "Z", data: readings.rawZ },
                  ]}
                  xAxis={readings.rawDatetime}
                  height={"100%"}
                  width={"100%"}
                />
              )}
              {!readings && <CircularProgress sx={{ alignSelf: "center" }} />}
            </CardContent>
          </Card>
          <Card
            elevation={4}
            sx={{
              height: "100%",
              flexBasis: "50%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardHeader
              title={
                <Typography variant="h6" color="white">
                  Accelerometer FFT Reading Snapshot
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
                <LineChart
                  data={[
                    { name: "X", data: readings.fftX },
                    { name: "Y", data: readings.fftY },
                    { name: "Z", data: readings.fftZ },
                  ]}
                  xAxis={readings.fftDatetime}
                  height={"100%"}
                  width={"100%"}
                />
              )}{" "}
              {!readings && <CircularProgress sx={{ alignSelf: "center" }} />}
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Container>
  );
};

export default NodeDetailsPage;
