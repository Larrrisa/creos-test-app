import style from "../styles/Header.module.css";
import { getWeekNumber } from "../utils/filterTasks";
import { ThemeContext } from "../utils/Theme";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [currentTheme, setCurrentTheme] = useState(theme);

  const toggleLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

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
        <div className={style.language_switcher}>
          <p onClick={() => toggleLanguage("ru")}>RU</p> /
          <p onClick={() => toggleLanguage("en")}>EN</p>
        </div>
        <div
          onClick={() => {
            toggleTheme();
            setCurrentTheme((prevTheme) =>
              prevTheme === "dark-theme" ? "light-theme" : "dark-theme"
            );
          }}
        >
          {currentTheme === "dark-theme" ? "☀" : "☾"}
        </div>
      </div>
    </div>
  );
}

export default Header;
