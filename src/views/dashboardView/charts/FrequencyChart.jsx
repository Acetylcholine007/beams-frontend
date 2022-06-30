import { memo } from "react";
import Chart from "react-apexcharts";

const FrequencyChart = ({ data, xAxis }) => {
  return (
    <Chart
      options={{
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: xAxis.map((value) => `${value} Hz`),
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
  );
};

export default memo(FrequencyChart);
