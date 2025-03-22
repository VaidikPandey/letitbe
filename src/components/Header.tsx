import React from "react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";

const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="header">
      <div className="logo">Your Logo</div>
      <nav className="navigation">
        <ul>
          <li>
            <a href="#">{t("header.home")}</a>
          </li>
          <li>
            <a href="/about">{t("header.about")}</a>
          </li>
          <li>
            <a href="/services">{t("header.services")}</a>
          </li>
          ``
          <li>
            <a href="/contact">{t("header.contact")}</a>
          </li>
          <li>
            <LanguageSelector />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
