import { useEffect, useState } from "react";
import { fetchTasks } from "../../redux/slices/TasksSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import filterTasksByWeek from "../../utils/filterTasks";
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

import PieChart from "../charts/PieChart";
import BarChart from "../charts/BarChart";
import style from "../../styles/Tasks.module.css";

function TasksPage() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.entities);

  Chart.register(
    ArcElement,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className={style.tasks_main}>
      <div className={style.item}>
        <PieChart tasks={tasks} />
      </div>
      <div className={style.item}>
        <BarChart tasks={tasks} />
      </div>
    </div>
  );
}

export default TasksPage;
