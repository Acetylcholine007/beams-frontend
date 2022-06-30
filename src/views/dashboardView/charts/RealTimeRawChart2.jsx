import Chart from "react-apexcharts";
import { DateTime } from "luxon";
import { memo } from "react";

const RealTimeRawChart2 = ({ realTimeRawReadings2 }) => {
  return (
    <Chart
      options={{
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false,
          },
          animations: {
            enabled: false,
          },
        },
        zoom: {
          enabled: false,
        },
        xaxis: {
          categories: realTimeRawReadings2.rawDatetime,
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
        { name: "X", data: realTimeRawReadings2.rawX },
        { name: "Y", data: realTimeRawReadings2.rawY },
        { name: "Z", data: realTimeRawReadings2.rawZ },
      ]}
      type="line"
      height="100%"
      width="100%"
    />
  );
};

export default memo(RealTimeRawChart2);
