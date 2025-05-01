// GradeRadarChart.tsx
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface GradeRadarChartProps {
  grades: number[]; // 예: [88, 92, 76, 95, 83, 90]
}

const GradeRadarChart = ({ grades }: GradeRadarChartProps) => {
  const labels = [
    "1학년 1학기",
    "1학년 2학기",
    "2학년 1학기",
    "2학년 2학기",
    "3학년 1학기",
    "3학년 2학기",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "성적",
        data: grades,
        backgroundColor: "rgba(34, 202, 236, 0.2)",
        borderColor: "rgba(34, 202, 236, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(34, 202, 236, 1)",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default GradeRadarChart;
