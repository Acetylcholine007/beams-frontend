import {
  Box,
  Card,
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
      <Box sx={{ height: "50%", display: "flex", flexDirection: "column" }}>
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
              flexGrow: "1",
              padding: 2,
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
            {!readings && <CircularProgress />}
          </Card>
          <Card
            elevation={4}
            sx={{
              height: "100%",
              flexGrow: "1",
              padding: 2,
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
            {!readings && <CircularProgress />}
          </Card>
        </Stack>
      </Box>
      <Box sx={{ height: "50%", display: "flex", flexDirection: "column" }}>
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
              flexGrow: "1",
              padding: 2,
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
            {!readings && <CircularProgress />}
          </Card>
          <Card
            elevation={4}
            sx={{
              height: "100%",
              flexGrow: "1",
              padding: 2,
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
            )}
            {!readings && <CircularProgress />}
          </Card>
        </Stack>
      </Box>
      {/* <Grid container spacing={4} sx={{height: '100%'}}>
        <Grid item xs={12} sx={{height: '100%'}}>
          <Typography variant="h3">Accelerometer Raw Chart</Typography>
          <Typography variant="p">Accelerometer raw data readings</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card
            elevation={4}
            sx={{
              height: "30rem",
              padding: 2,
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
            {!readings && <CircularProgress />}
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Controls</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox defaultChecked checked={true} onChange={() => {}} />
              }
              label="Display X - Axis"
            />
            <FormControlLabel
              control={
                <Checkbox defaultChecked checked={true} onChange={() => {}} />
              }
              label="Display Y - Axis"
            />
            <FormControlLabel
              control={
                <Checkbox defaultChecked checked={true} onChange={() => {}} />
              }
              label="Display Z - Axis"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Accelerometer FFT Chart</Typography>
          <Typography variant="p">
            Accelerometer fast fourier transform data
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card
            elevation={4}
            sx={{
              height: "30rem",
              padding: 2,
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
            )}
            {!readings && <CircularProgress />}
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Controls</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox defaultChecked checked={true} onChange={() => {}} />
              }
              label="Display X - Axis"
            />
            <FormControlLabel
              control={
                <Checkbox defaultChecked checked={true} onChange={() => {}} />
              }
              label="Display Y - Axis"
            />
            <FormControlLabel
              control={
                <Checkbox defaultChecked checked={true} onChange={() => {}} />
              }
              label="Display Z - Axis"
            />
          </FormGroup>
        </Grid>
      </Grid> */}
    </Container>
  );
};

export default NodeDetailsPage;
