import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const TIME_RANGE_IN_MILLISECONDS = 1 * 1000;
const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 1000;
const CYCLES = 5;
const categories = [...Array(10).keys()].map((value) => `${value} Hz`);

const RealTimeFFTChart = () => {
  const { realTimeFFTReadings } = useSelector((state) => state.dashboard);
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
    xaxis: {
      type: "numeric",
      range: 50
    },
    yaxis: {
      labels: {
        formatter: (val) => val.toFixed(0),
      },
      title: { text: "Acceleration" },
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
        series={realTimeFFTReadings}
        height="100%"
        width="100%"
      />
    </>
  );
};

export default RealTimeFFTChart;
