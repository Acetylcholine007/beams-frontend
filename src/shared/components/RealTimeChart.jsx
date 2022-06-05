import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const TIME_RANGE_IN_MILLISECONDS = 30 * 1000;
const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 1000;
const CYCLES = 2;

const RealTimeChart = () => {
  const nameList = ["X", "Y", "Z"];
  const defaultDataList = nameList.map((name) => ({
    name: name,
    data: [],
  }));
  const [dataList, setDataList] = useState(defaultDataList);
  const [options, setOptions] = useState({
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
        format: "yyyy/MM/dd HH:mm:ss.f",
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

  useEffect(() => {
    const addDataRandomly = (data) => {
      if (
        data.length ===
        (TIME_RANGE_IN_MILLISECONDS / ADDING_DATA_INTERVAL_IN_MILLISECONDS) *
          CYCLES
      ) {
        let newData = data.slice(
          data.length -
            TIME_RANGE_IN_MILLISECONDS / ADDING_DATA_INTERVAL_IN_MILLISECONDS
        );
        newData.shift();
        newData.push({
          x: new Date(),
          y: data.length * Math.random(),
        });
        return newData;
      } else {
        return [
          ...data,
          {
            x: new Date(),
            y: data.length * Math.random(),
          },
        ];
      }
    };
    const interval = setInterval(() => {
      if (
        dataList[0].data.length ===
        (TIME_RANGE_IN_MILLISECONDS / ADDING_DATA_INTERVAL_IN_MILLISECONDS) *
          CYCLES -
          1
      ) {
      }
      setDataList(
        dataList.map((val) => {
          return {
            name: val.name,
            data: addDataRandomly(val.data),
          };
        })
      );
      if (
        dataList[0].data.length ===
        TIME_RANGE_IN_MILLISECONDS / ADDING_DATA_INTERVAL_IN_MILLISECONDS
      ) {
      }
    }, ADDING_DATA_INTERVAL_IN_MILLISECONDS);

    return () => clearInterval(interval);
  });

  return (
    <>
      <Chart
        type="line"
        options={options}
        series={dataList}
        height="100%"
        width="100%"
      />
    </>
  );
};

export default RealTimeChart;
