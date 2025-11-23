import React from "react";
import "./HowItStarted.css";
import { useTranslation } from "react-i18next";

const HowItStarted = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{ gap: "30px" }}
      className="d-flex py-3 flex-column flex-fill justify-content-center align-items-center"
    >
      <div
        className="d-flex justify-content-center align-items-center text-center text-black"
        style={{ fontWeight: "bold" }}
      >
        <span className="d-none d-md-block" style={{ fontSize: "75px" }}>
          {t("aboutUsPage.howItStarted.title")}
        </span>
        <span className="d-md-none" style={{ fontSize: "42px" }}>
          {t("aboutUsPage.howItStarted.title")}
        </span>
      </div>

      <div
        className="d-flex flex-column justify-content-center align-items-center gap-3 p-1"
        style={{ maxWidth: "850px" }}
      >
        {/* DESKTOP TEXT */}
        <p
          className="text-center fw-light d-none d-md-block fs-3"
          dangerouslySetInnerHTML={{
            __html: t("aboutUsPage.howItStarted.text"),
          }}
        ></p>

        {/* MOBILE TEXT */}
        <p
          className="text-center fw-light d-md-none fs-5"
          dangerouslySetInnerHTML={{
            __html: t("aboutUsPage.howItStarted.text"),
          }}
        ></p>
      </div>
    </div>
  );
};

export default HowItStarted;
