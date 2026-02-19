import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguagePieChart = ({ data }) => {
  const labels = data ? Object.keys(data) : [];
  const values = data ? Object.values(data) : [];

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#6366f1",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4",
        ],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 14,
          padding: 15,
          font: {
            size: 13,
            weight: "500",
          },
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        callbacks: {
          label: function (context) {
            return ` ${context.label}: ${context.raw} mins`;
          },
        },
      },
    },
  };

  return (
    <div style={{ height: "320px" }}>
      {labels.length > 0 ? (
        <Pie data={chartData} options={options} />
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9ca3af",
            fontWeight: 500,
          }}>
          No language data available
        </div>
      )}
    </div>
  );
};

export default LanguagePieChart;
