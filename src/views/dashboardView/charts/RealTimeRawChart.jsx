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
        enabled: false,
        // easing: "linear",
        // dynamicAnimation: {
        //   speed: ADDING_DATA_INTERVAL_IN_MILLISECONDS,
        // },
      },
    },
    // xaxis: {
    //   categories: xAxis.map((stamp) =>
    //     DateTime.fromISO(stamp)
    //       .setZone("Asia/Manila")
    //       .toFormat("ss' sec. 'SSS' ms.'")
    //   ),
    // },
    tooltip: {
      x: {
        format: "HH:mm:ss.f",
      },
    },
    xaxis: {
      type: "datetime",
      range: TIME_RANGE_IN_MILLISECONDS,
      labels: {
        format: "dd/MM",
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => val.toFixed(0),
      },
      title: { text: "Amplitude" },
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
