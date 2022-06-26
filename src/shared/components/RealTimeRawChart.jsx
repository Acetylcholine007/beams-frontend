import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const TIME_RANGE_IN_MILLISECONDS = 1 * 1000;
const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 1000;
const CYCLES = 5;

const RealTimeRawChart = () => {
  const { realTimeRawReadings } = useSelector((state) => state.dashboard);
  const [options] = useState({
    chart: {
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: ADDING_DATA_INTERVAL_IN_MILLISECONDS,
        },
      },
    },
    tooltip: {
      x: {
        format: "HH:mm:ss.f",
      },
    },
    xaxis: {
      type: "datetime",
      range: TIME_RANGE_IN_MILLISECONDS,
    },
    yaxis: {
      labels: {
        formatter: (val) => val.toFixed(0),
      },
      title: { text: "Value" },
    },
    stroke: {
      curve: "smooth",
    },
  });

  return (
    <>
      <Chart
        type="line"
        options={options}
        series={realTimeRawReadings}
        height="100%"
        width="100%"
      />
    </>
  );
};

export default RealTimeRawChart;
