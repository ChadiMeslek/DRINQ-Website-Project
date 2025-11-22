import React from "react";
import Img from "../../assets/Drinking-woman.jpg";
import "./ImgWTitle2.css";
import { useTranslation } from "react-i18next";
const ImgWTitle = () => {
  const { t } = useTranslation();
  return (
    <div className="img-hero-container2 position-relative">
      <img src={Img} alt="" className="img-hero2" />

      <div className="img-hero-overlay2"></div>

      <div
        className="position-absolute top-50 start-0 translate-middle-y text-white 
                    d-flex flex-column gap-2 hero-text2"
      >
        <span
          className="d-none d-md-block who-title2 fw-bold"
          style={{ fontSize: "65px", paddingLeft: "10px" }}
        >
          {t("aboutUsPage.imgWTitle2.title")}
        </span>

        {/* Mobile title */}
        <span
          className="d-md-none fw-bold"
          style={{ fontSize: "28px", paddingLeft: "10px" }}
        >
          {t("aboutUsPage.imgWTitle2.title")}
        </span>

        <div className="d-flex flex-fill">
          <p
            className=" hero-subtitle2 subtitle-padding2"
            dangerouslySetInnerHTML={{
              __html: t("aboutUsPage.imgWTitle2.text"),
            }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default ImgWTitle;
