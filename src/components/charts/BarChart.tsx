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
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import { filterTasksByWeek } from "../../utils/filterTasks";
import style from "../../styles/BarChart.module.css";
import { useTranslation } from "react-i18next";

function BarChart({ tasks }: any) {
  Chart.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const { t } = useTranslation();
  const [week, setWeek] = useState<number>(8);
  const weeksData = filterTasksByWeek(tasks, week);

  const datasets = {
    labels: weeksData.map((data) => `Неделя ${data.week}`),
    datasets: [
      {
        label: "Приход",
        data: weeksData.map((data) => data.received_from_client),
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Затраты",
        data: weeksData.map(
          (data) =>
            data.send_to_account_manager +
            data.send_to_project_manager +
            data.send_to_designer
        ),
        backgroundColor: "rgb(54, 162, 235)",
      },
      {
        label: "Прибыль",
        data: weeksData.map((data) => data.difference),
        backgroundColor: "rgb(255, 205, 86)",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "black",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2000,
        },
      },
    },
  };

  const handleInputChange = (event: any) => {
    const value = event.target.value;
    if (!isNaN(Number(value))) {
      setWeek(Number(value));
    }
  };

  return (
    <div>
      <h2>{t("tasksFinished")}</h2>
      <h3>{t("enterWeeks")}</h3>
      <input value={week} onChange={handleInputChange} />
      <div className={style.bar_chart}>
        <Bar data={datasets} options={options} />
      </div>
    </div>
  );
}

export default BarChart;
