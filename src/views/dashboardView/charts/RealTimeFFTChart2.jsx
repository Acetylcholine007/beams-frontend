import { memo } from "react";
import Chart from "react-apexcharts";

const RealTimeFFTChart2 = ({ realTimeFFTReadings2 }) => {
  return (
    <Chart
      options={{
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false,
          },
        },
        zoom: {
          enabled: false,
        },
        xaxis: {
          categories: realTimeFFTReadings2.fftFrequency,
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
      series={[
        { name: "X", data: realTimeFFTReadings2.fftX },
        { name: "Y", data: realTimeFFTReadings2.fftY },
        { name: "Z", data: realTimeFFTReadings2.fftZ },
      ]}
      type="line"
      height="100%"
      width="100%"
    />
  );
};

export default memo(RealTimeFFTChart2);
