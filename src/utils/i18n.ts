import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          main: "Main",
          tasks: "Tasks",
          designers: "Designers",
          topComments: "Top comments",
          topDesigners: "Top designers",
          week: "Week",
          sortByName: "Sort by name",
          sortByEmail: "Sort by email",
          status: "Status",
          inProgress: "In progress",
          done: "Done",
          tasksStatistics: "Tasks statistics",
          tasksFinished: "Finished tasks",
          enterWeeks: "Enter the number of weeks",
        },
      },
      ru: {
        translation: {
          main: "Главная",
          tasks: "Задачи",
          designers: "Дизайнеры",
          topComments: "Топ комментариев",
          topDesigners: "Топ дизайнеров",
          week: "Неделя",
          sortByName: "Сортировать по имени",
          sortByEmail: "Сортировать по почте",
          status: "Статус",
          inProgress: "В работе",
          done: "Выполнена",
          tasksStatistics: "Статистика по задачам",
          tasksFinished: "Закрытые задачи",
          enterWeeks: "Введите количество недель",
        },
      },
    },
  });

export default i18n;
