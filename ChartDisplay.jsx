import React, { useRef } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "react-bootstrap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartDisplay = ({ chartData, chartLabels }) => {
  const lineRef = useRef(null);
  const barRef = useRef(null);

  if (!chartData || !chartLabels) return null;

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Line/Bar Data",
        data: chartData,
        fill: false,
        backgroundColor: "rgba(30,60,114,0.5)",
        borderColor: "#1e3c72",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: false },
    },
  };

  const saveChartAsImage = (ref, name) => {
    if (!ref.current) return;
    const url = ref.current.toBase64Image();
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h4 className="mb-3">Line Chart</h4>
      <Line ref={lineRef} data={data} options={options} />
      <Button className="mt-2 mb-4" variant="success" onClick={() => saveChartAsImage(lineRef, 'line-chart.png')}>
        Save Line Chart
      </Button>
      <h4 className="mb-3 mt-4">Bar Chart</h4>
      <Bar ref={barRef} data={data} options={options} />
      <Button className="mt-2" variant="success" onClick={() => saveChartAsImage(barRef, 'bar-chart.png')}>
        Save Bar Chart
      </Button>
    </div>
  );
};

export default ChartDisplay;
