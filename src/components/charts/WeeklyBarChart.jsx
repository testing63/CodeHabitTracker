import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const WeeklyBarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.week),
    datasets: [
      {
        label: "Days Coded",
        data: data.map((item) => item.days),
        backgroundColor: "#6366f1",
        borderRadius: 6,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default WeeklyBarChart;
