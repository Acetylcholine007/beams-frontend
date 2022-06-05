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
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNode } from "../../../controllers/nodeController";
import LineChart from "../../../shared/components/LineChart";
import RealTimeChart from "../../../shared/components/RealTimeChart";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers";

const NodeDetailsPage = () => {
  const { readings, value, setValue } = useNode();

  return (
    <Container sx={{ height: "100%" }}>
      <Box sx={{ height: "60%", display: "flex", flexDirection: "column" }}>
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
              {readings && <RealTimeChart />}
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
                  Raw Reading Snapshot
                </Typography>
              }
              sx={{ backgroundColor: "primary.main" }}
              action={
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="DateTimePicker"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
              }
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
                />
              )}
              {!readings && <CircularProgress sx={{ alignSelf: "center" }} />}
            </CardContent>
          </Card>
        </Stack>
      </Box>
      <Box sx={{ height: "60%", display: "flex", flexDirection: "column" }}>
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
              {readings && <RealTimeChart />}
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
                  FFT Reading Snapshot
                </Typography>
              }
              sx={{ backgroundColor: "primary.main" }}
              action={
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="DateTimePicker"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
              }
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
