import { useEffect, useState } from "react";
import { fetchComments } from "../../redux/slices/CommentsSlice";
import { fetchDesigners } from "../../redux/slices/DesignersSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import filteredByDate from "../../utils/filterByDate";
import getCountedDays from "../../utils/countDays";
import filterTopDesigners from "../../utils/filterDesigners";
import style from "../../styles/MainPage.module.css";
import { useTranslation } from "react-i18next";

function MainPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.comments.entities);
  const designers = useAppSelector((state) => state.designers.entities);
  const loading = useAppSelector((state) => state.comments.loading);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [topDesigners, setTopDesigners] = useState<Designer[]>([]);

  useEffect(() => {
    dispatch(fetchComments());
    dispatch(fetchDesigners());
  }, [dispatch]);

  useEffect(() => {
    setFilteredComments(filteredByDate(comments));
    setTopDesigners(filterTopDesigners(designers));
  }, [comments, designers]);

  return (
    <div className={style.main_page}>
      <div className={style.content}>
        <h2>{t("topComments")}</h2>
        {loading === "pending" && <div>Loading...</div>}
        {filteredComments.slice(0, 10).map((item: any) => (
          <div key={item.id} className={style.comments_top}>
            <div className={style.comments_image}>
              <img src={`${item.designer.avatar}`} alt="" />
              <p>
                <span>{item.designer.username}</span>
              </p>
            </div>
            <div>
              <p>
                <span>Сообщение:</span> {item.message}
              </p>
              <p>
                {" "}
                {getCountedDays(item.date_created).days} д{" "}
                {getCountedDays(item.date_created).hours} ч{" "}
                {getCountedDays(item.date_created).minutes} м назад
              </p>
              <p>
                <span>Задача: </span>
                {item.issue}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={style.content}>
        <h2>{t("topDesigners")}</h2>
        {loading === "pending" && <div>Loading...</div>}
        {topDesigners.slice(0, 10).map((item) => (
          <div className={style.designers_top}>
            <div className={style.designers_image}>
              <img src={`${item.avatar}`} alt="" />
              <p>
                <span>{item.username}</span>
              </p>
            </div>
            <div>
              <p>
                <span>Задач:</span> {item.issuesCount}
              </p>
              <p>
                <span>Дней на задачу:</span> {item.medianTimeInDays}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
