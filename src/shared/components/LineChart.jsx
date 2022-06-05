import Chart from "react-apexcharts";

const LineChart = ({ data, xAxis }) => {
  return (
    <Chart
      options={{
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: xAxis,
          type: "datetime",
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
