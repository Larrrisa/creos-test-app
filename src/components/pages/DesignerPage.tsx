import { useEffect, useState } from "react";
import { fetchDesigners } from "../../redux/slices/DesignersSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  filterFinishedTasks,
  filterInProgressTasks,
} from "../../utils/filterDesigners";
import style from "../../styles/Designers.module.css";
import { useTranslation } from "react-i18next";

function DesignerPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const designers = useAppSelector((state) => state.designers.entities);
  const loading = useAppSelector((state) => state.comments.loading);
  const [sorted, setSorted] = useState<Designer[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 16;
  const totalDesigners = designers.length;
  const totalPages = Math.ceil(totalDesigners / itemsOnPage);

  useEffect(() => {
    dispatch(fetchDesigners());
  }, [dispatch]);

  useEffect(() => {
    setSorted(designers);
  }, [designers]);

  function handleSortByName() {
    const sortedByName = [...designers].sort((a, b) => {
      return a.username.localeCompare(b.username);
    });
    setSorted(sortedByName);
  }

  function handleSortByEmail() {
    const sortedByEmail = [...designers].sort((a, b) => {
      return a.email.localeCompare(b.email);
    });
    setSorted(sortedByEmail);
  }

  function handleSelectStatus(event) {
    const selectedStatus = event.target.value;
    setSelectedStatus(selectedStatus);

    if (selectedStatus === "") {
      setSorted(designers);
      return;
    }
    const filtered = designers
      .map((item) => {
        let filteredTasks = [];
        if (selectedStatus === "Done") {
          filteredTasks = filterFinishedTasks(item.issues);
        } else if (selectedStatus === "In Progress") {
          filteredTasks = filterInProgressTasks(item.issues);
        }
        return { ...item, issues: filteredTasks };
      })
      .filter((item) => item.issues.length > 0)
      .sort((a, b) => b.issues.length - a.issues.length);

    setSorted(filtered);
  }

  return (
    <div className={style.designers}>
      <div className={style.designers_header}>
        <div onClick={handleSortByName} className={style.designer_sort}>
          {t("sortByName")}
        </div>
        <div onClick={handleSortByEmail} className={style.designer_sort}>
          {t("sortByEmail")}
        </div>
        <select onChange={handleSelectStatus}>
          <option value="">{t("status")}</option>
          <option value="In Progress">{t("inProgress")}</option>
          <option value="Done">{t("done")}</option>
        </select>
      </div>
      <div className={style.designers_cards}>
        {loading === "pending" && <div>Loading...</div>}
        {sorted
          .slice((currentPage - 1) * itemsOnPage, currentPage * itemsOnPage)
          .map((item) => {
            const finishedTasksCount = filterFinishedTasks(item.issues).length;
            const inProgressTasksCount = filterInProgressTasks(
              item.issues
            ).length;
            return (
              <div key={item.email} className={style.designer_card}>
                <div className={style.designer_image}>
                  <img src={`${item.avatar}`} alt="" />
                </div>
                <div className={style.designer_info}>
                  <p className={style.designer_name}>{item.username}</p>
                  <p>email: {item.email}</p>
                  {selectedStatus !== "In Progress" && (
                    <p>Задач выполненных: {finishedTasksCount}</p>
                  )}
                  {selectedStatus !== "Done" && (
                    <p>Задач в работе: {inProgressTasksCount}</p>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      <div className={style.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DesignerPage;
