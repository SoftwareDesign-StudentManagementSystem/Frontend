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
import { SubjectScore } from "../../../types/grades.ts";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface GradeRadarChartProps {
  grades: Record<string, any>; // grades는 동적 객체
}

const GradeRadarChart = ({ grades }: GradeRadarChartProps) => {
  // grades가 undefined, null이거나 빈 객체일 경우 처리
  if (!grades || Object.keys(grades).length === 0) {
    return <p>성적 정보가 없습니다.</p>;
  }

  // 과목 리스트를 객체에서 추출 (과목 이름은 grades 객체의 키에 해당)
  const subjectKeys = Object.keys(grades).filter(
    (key) =>
      typeof grades[key] === "object" &&
      grades[key] !== null &&
      "score" in grades[key],
  );

  // 라벨: 과목명
  const labels = subjectKeys;
  console.log("labels", labels);

  // datasets 구성: 객체에서 과목별 점수 추출
  const datasets = [
    {
      label: "성적",
      data: subjectKeys.map(
        (subject) => (grades[subject] as SubjectScore).score,
      ),
      fill: true,
      backgroundColor: "rgba(34, 202, 236, 0.2)",
      borderColor: "rgba(34, 202, 236, 1)",
      pointBackgroundColor: "rgba(34, 202, 236, 1)",
      borderWidth: 2,
    },
  ];

  const data = { labels, datasets };
  console.log("data", data);

  const options = {
    responsive: true,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
        angleLines: { display: true },
        ticks: { stepSize: 20 },
      },
    },
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false },
    },
  };

  return <Radar data={data} options={options} />;
};

export default GradeRadarChart;
