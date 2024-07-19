import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import style from "../../styles/PieChart.module.css";
import { useTranslation } from "react-i18next";

function PieChart({ tasks }: any) {
  Chart.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const totalCount = tasks.length;
  const { t } = useTranslation();
  const doneCount = tasks.filter((item: any) => item.status === "Done").length;
  const newCount = tasks.filter((item: any) => item.status === "New").length;
  const inProgressCount = tasks.filter(
    (item: any) => item.status === "In Progress"
  ).length;

  const donePercentage = ((doneCount / totalCount) * 100).toFixed(2);
  const newPercentage = ((newCount / totalCount) * 100).toFixed(2);
  const inProgressPercentage = ((inProgressCount / totalCount) * 100).toFixed(
    2
  );

  const data = {
    labels: ["Done", "New", "In Progress"],
    datasets: [
      {
        data: [donePercentage, newPercentage, inProgressPercentage],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "black",
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <>
      <h2>{t("tasksStatistics")}</h2>
      <div className={style.pie_chart}>
        <Pie data={data} options={options} />
      </div>
    </>
  );
}

export default PieChart;
