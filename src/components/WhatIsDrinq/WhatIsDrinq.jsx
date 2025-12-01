import React from "react";
import DRINQImg from "../../assets/DRINQ-vending-machine-2.png";
import "./WhatIsDrinq.css";
import { useTranslation } from "react-i18next";
const WhatIsDrinq = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        backgroundColor: "#F5F7FA",
        gap: "30px",
      }}
      className="
      d-flex flex-column align-items-center
    px-3        /* mobile */
    py-4
    px-md-5
    py-md-25px
    px-xl-custom py-xl-custom /* custom, see below */"
    >
      {/* TITLE */}
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{
          fontSize: "75px",
          fontWeight: "bold",
        }}
      >
        <span className="d-none d-md-block">
          {t("homePage.whatIsDrinq.title")}
        </span>
        <span className="d-md-none" style={{ fontSize: "42px" }}>
          {t("homePage.whatIsDrinq.title")}
        </span>
      </div>

      {/* CONTENT */}
      <div className="home-gap justify-content-center align-items-center w-100">
        {/* MOBILE IMAGE (xs + sm) */}
        <img
          src={DRINQImg}
          alt="DRINQ"
          className="img-fluid d-block d-md-none"
          style={{
            height: "350px",
            maxWidth: "100%",
          }}
        />

        {/* DESKTOP IMAGE (md, lg, xl, xxl) */}
        <img
          src={DRINQImg}
          alt="DRINQ"
          className="img-fluid d-none d-md-block"
          style={{
            height: "697px",
            maxWidth: "100%",
          }}
        />

        {/* TEXT + CARDS */}
        <div
          className="d-flex flex-column justify-content-center align-items-center gap-3"
          style={{ maxWidth: "800px" }}
        >
          {/* PARAGRAPH */}
          <p
            className="text-center fs-3 fw-regular d-none d-md-block"
            dangerouslySetInnerHTML={{
              __html: t("homePage.whatIsDrinq.descriptionDesktop"),
            }}
          ></p>

          <p
            className="text-center fs-5 fw-regular d-md-none"
            dangerouslySetInnerHTML={{
              __html: t("homePage.whatIsDrinq.descriptionMobile"),
            }}
          ></p>

          {/* CARDS */}
          <div className="d-flex flex-row w-100 gap-4 d-none d-md-flex">
            <div className="d-flex flex-column w-100 justify-content-start align-items-center gap-2 pt-3 pb-3 px-3 border border-black rounded-5">
              <p className="text-black text-center fs-4 fw-bold">
                {t("homePage.whatIsDrinq.cards.0.title")}
              </p>
              <p className="text-black text-center fs-5 fw-regular">
                {t("homePage.whatIsDrinq.cards.0.text")}
              </p>
            </div>
            <div className="d-flex flex-column w-100 justify-content-start align-items-center gap-2 pt-3 pb-3 px-3 border border-black rounded-5">
              <p className="text-black text-center fs-4 fw-bold">
                {t("homePage.whatIsDrinq.cards.1.title")}
              </p>
              <p className="text-black text-center fs-5 fw-regular">
                {t("homePage.whatIsDrinq.cards.1.text")}
              </p>
            </div>
          </div>

          {/* MOBILE/TABLET: STACKED */}
          <div className="d-flex flex-column gap-3 w-100 d-flex d-md-none">
            <Card
              className="w-100"
              title={t("homePage.whatIsDrinq.cards.0.title")}
              text={t("homePage.whatIsDrinq.cards.0.text")}
            />

            <Card
              title={t("homePage.whatIsDrinq.cards.1.title")}
              text={t("homePage.whatIsDrinq.cards.1.text")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, text }) => (
  <div
    className="d-flex flex-column justify-content-center align-items-center border border-black rounded-5"
    style={{ padding: "20px" }}
  >
    <p className="text-black text-center fs-4 fw-bold">{title}</p>
    <p className="text-black text-center fs-6 fw-regular">{text}</p>
  </div>
);

export default WhatIsDrinq;
