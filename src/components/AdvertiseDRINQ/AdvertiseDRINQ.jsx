import React from "react";
import Image from "../../assets/AdvertiseImg.png";
import "./AdvertiseDRINQ.css";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
const AdvertiseDRINQ = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleScrollToLocations = () => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        document
          .getElementById("locations")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document
        .getElementById("locations")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="
        px-3 py-4
        px-md-5
        px-xl-custom py-xl-custom
        d-flex flex-column align-items-center
      "
      style={{
        backgroundColor: "#F5F7FA",
        gap: "30px",
      }}
    >
      {/* IMAGE + TEXT BLOCK */}
      <div className="advertise-gap justify-content-center align-items-center w-100">
        {/* MOBILE IMAGE */}
        <img
          src={Image}
          alt="DRINQ"
          className="img-fluid d-block d-md-none"
          style={{ height: "230px", maxWidth: "100%" }}
        />

        {/* DESKTOP IMAGE */}
        <img
          src={Image}
          alt="DRINQ"
          className="img-fluid d-none d-md-block"
          style={{ height: "600px", maxWidth: "100%" }}
        />

        {/* TEXT BLOCK */}
        <div className="d-flex flex-column" style={{ gap: "30px" }}>
          {/* TITLE */}
          <div
            className="d-flex justify-content-center align-items-center text-center"
            style={{ fontWeight: "bold" }}
          >
            <span
              className="d-none d-md-block text-black"
              style={{ fontSize: "75px" }}
            >
              {t("advertisingPage.advertiseDrinq.title")}
            </span>
            <span className="d-md-none text-black" style={{ fontSize: "42px" }}>
              {t("advertisingPage.advertiseDrinq.title")}
            </span>
          </div>
          <div
            className="d-flex flex-column justify-content-center align-items-center gap-3"
            style={{ maxWidth: "800px" }}
          >
            <p
              className="
  text-center fw-light
  d-none d-md-block fs-3     /* desktop */
"
            >
              {t("advertisingPage.advertiseDrinq.text")}
            </p>

            <p
              className="
  text-center fw-light
  d-md-none fs-5             /* mobile */
"
            >
              {t("advertisingPage.advertiseDrinq.text")}
            </p>

            {/* BUTTON */}
            <Button
              className="location-btn button-advertising fw-semibold  rounded-4 py-3 px-3"
              style={{ backgroundColor: "black", borderColor: "black" }}
              onClick={handleScrollToLocations}
            >
              {t("advertisingPage.advertiseDrinq.button")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseDRINQ;
