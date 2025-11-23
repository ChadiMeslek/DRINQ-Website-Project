import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "./DRINQBenefits.css";
import { useTranslation } from "react-i18next";
export default function DRINQBenefits() {
  const { t } = useTranslation();
  const benefits = [
    t("homePage.drinqBenefits.list.0"),
    t("homePage.drinqBenefits.list.1"),
    t("homePage.drinqBenefits.list.2"),
    t("homePage.drinqBenefits.list.3"),
    t("homePage.drinqBenefits.list.4"),
  ];

  return (
    <div
      style={{ gap: "30px" }}
      className="
        d-flex flex-column align-items-center
        px-3 py-4               /* mobile */
        px-md-5 py-md-5         /* tablet */
        px-xl-custom py-xl-custom  /* desktop */
      "
    >
      {/* TITLE */}
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{ fontWeight: "bold" }}
      >
        <span className="d-none d-md-block" style={{ fontSize: "75px" }}>
          {t("homePage.drinqBenefits.title")}
        </span>
        <span className="d-md-none" style={{ fontSize: "42px" }}>
          {t("homePage.drinqBenefits.title")}
        </span>
      </div>

      {/* BENEFITS LIST */}
      <div className="w-100 d-flex flex-column gap-3">
        {benefits.map((text, index) => (
          <div key={index} className="d-flex align-items-center gap-2">
            {/* ICON — responsive sizes */}
            <AiOutlineCheck
              className="
                d-none d-xl-block
              "
              size={36}
            />
            <AiOutlineCheck
              className="
                d-none d-md-block d-xl-none
              "
              size={28}
            />
            <AiOutlineCheck className="d-md-none" size={20} />

            {/* TEXT — responsive sizes */}
            <span
              className="
                d-none d-xl-block
              "
              style={{ fontSize: "36px" }}
            >
              {text}
            </span>

            <span
              className="
                d-none d-md-block d-xl-none
              "
              style={{ fontSize: "28px" }}
            >
              {text}
            </span>

            <span className="d-md-none" style={{ fontSize: "20px" }}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
