import Chart from "react-apexcharts";

const LineChart = ({ data, xAxis, height, width }) => {

  return (
    <Chart
      options={{
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: xAxis,
        },
      }}
      series={data}
      type="line"
      // height={height || "250px"}
      // width={width || "250px"}
      height="100%"
      width="100%"
    />
  );
};

export default LineChart;
