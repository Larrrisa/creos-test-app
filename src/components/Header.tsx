import style from "../styles/Header.module.css";
import { getWeekNumber } from "../utils/filterTasks";
import { ThemeContext } from "../utils/Theme";
import { useContext } from "react";
import "@theme-toggles/react/css/Simple.css";
import { Simple } from "@theme-toggles/react";
import { useTranslation } from "react-i18next";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  const toggleLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={style.header}>
      <div className={style.header_links}>
        <a href="/">{t("main")}</a>
        <a href="/tasks">{t("tasks")}</a>
        <a href="/designers">{t("designers")}</a>
      </div>

      <div className={style.header_controls}>
        <p>
          {t("week")} № {getWeekNumber(new Date())}
        </p>
        <div className={style.languageSwitcher}>
          <span onClick={() => toggleLanguage("ru")}>RU</span> /
          <span onClick={() => toggleLanguage("en")}>EN</span>
        </div>
        <button onClick={() => toggleTheme()}>
          <Simple />
        </button>
      </div>
    </div>
  );
}

export default Header;
