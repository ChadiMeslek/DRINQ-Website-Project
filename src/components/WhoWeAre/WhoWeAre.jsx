import React from "react";
import Logo from "../../assets/people_talking.jpg";
import "./WhoWeAre.css"; // optional if you want custom spacing classes
import { useTranslation } from "react-i18next";
const WhoWeAre = () => {
  const { t } = useTranslation();
  return (
    <div
      className="
        px-3 py-4
        px-md-5
        px-xl-custom py-xl-custom
        d-flex flex-column align-items-center
      "
      style={{ backgroundColor: "#F5F7FA" }}
    >
      {/* IMAGE + TEXT BLOCK (same structure as AdvertiseDRINQ) */}
      <div className="advertise-gap justify-content-center align-items-center w-100">
        {/* MOBILE IMAGE */}
        <img
          src={Logo}
          alt="DRINQ Logo"
          className="img-fluid d-block d-md-none"
          style={{ height: "230px", maxWidth: "100%" }}
        />

        {/* DESKTOP IMAGE */}
        <img
          src={Logo}
          alt="DRINQ Logo"
          className="img-fluid d-none d-md-block who-logo"
          style={{ height: "450px", maxWidth: "100%" }}
        />

        {/* TEXT BLOCK */}
        {/* TITLE */}
        <div
          style={{ gap: "30px" }}
          className="d-flex flex-column justify-content-center align-items-center text-center fw-bold text-black"
        >
          {/* Desktop title */}
          <span className="d-none d-md-block " style={{ fontSize: "75px" }}>
            {t("aboutUsPage.whoWeAre.title")}
          </span>

          {/* Mobile title */}
          <span className="d-md-none" style={{ fontSize: "42px" }}>
            {t("aboutUsPage.whoWeAre.title")}
          </span>
          <div
            className="d-flex flex-column justify-content-center align-items-center gap-3"
            style={{ maxWidth: "800px" }}
          >
            {/* Desktop Text */}
            <p className="text-center fw-light d-none d-md-block fs-3 who-text">
              {t("aboutUsPage.whoWeAre.text")}
            </p>

            {/* Mobile Text */}
            <p className="text-center fw-light d-md-none fs-5">
              {t("aboutUsPage.whoWeAre.text")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
