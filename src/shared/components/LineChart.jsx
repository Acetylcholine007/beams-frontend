import Chart from "react-apexcharts";

const LineChart = ({ data, xAxis, isTimeDomain }) => {
  return (
    <Chart
      options={{
        chart: {
          id: "basic-bar",
        },
        xaxis: isTimeDomain
          ? {
              categories: xAxis,
              type: "datetime",
            }
          : {
              categories: xAxis,
            },
        yaxis: {
          labels: {
            formatter: (val) => val.toFixed(4),
          },
          title: { text: "Value" },
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

export default LineChart;
