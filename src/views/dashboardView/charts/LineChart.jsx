import Chart from "react-apexcharts";
import { DateTime } from "luxon";
import { memo } from "react";

const LineChart = ({ data, xAxis }) => {
  return (
    <Chart
      options={{
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: xAxis.map((stamp) =>
            DateTime.fromISO(stamp)
              .setZone("Asia/Manila")
              .toFormat("ss' sec. 'SSS' ms.'")
          ),
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

export default memo(LineChart);
