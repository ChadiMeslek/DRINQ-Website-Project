import React from "react";
import Img from "../../assets/Lifting-man.jpg";
import "./ImgWTitle.css";
import { useTranslation } from "react-i18next";
const ImgWTitle = () => {
  const { t } = useTranslation();
  return (
    <div className="img-hero-container1 position-relative">
      <img src={Img} alt="Lifting" className="img-hero1" />
      <div className="img-hero-overlay1"></div>

      <div className="hero-text1 text-white">
        <span
          className="d-none d-md-block hero-title1 w-50"
          style={{ fontSize: "95px" }}
        >
          {t("aboutUsPage.imgWTitle.title")}
        </span>

        <span className="d-md-none hero-title1" style={{ fontSize: "45px" }}>
          {t("aboutUsPage.imgWTitle.title")}
        </span>
      </div>
    </div>
  );
};

export default ImgWTitle;
