import React from "react";
import Image from "../../assets/WhyItWorksImg.png";
import "./WhyItWorks.css";
import { AiOutlineCheck } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const WhyItWorks = () => {
  const { t } = useTranslation();
  const benefits = [
    t("advertisingPage.whyItWorks.benefits.0"),
    t("advertisingPage.whyItWorks.benefits.1"),
    t("advertisingPage.whyItWorks.benefits.2"),
    t("advertisingPage.whyItWorks.benefits.3"),
  ];
  return (
    <div className="custom-padding" style={{ backgroundColor: "white" }}>
      <div
        className="
          d-flex 
          flex-column flex-xl-row 
          align-items-center 
          justify-content-between 
          gap-4 
          gap-md-5 
          gap-xl-0
        "
        style={{
          // EXTRA desktop spacing
          columnGap: "0",
        }}
      >
        {/* LEFT SIDE – TEXT */}
        <div
          style={{
            gap: "30px",
          }}
          className="
          why-it-works-section
          w-100
        "
        >
          <span
            className="d-none w-100 d-md-block fw-bold"
            style={{ fontSize: "75px", paddingLeft: "45px" }}
          >
            {t("advertisingPage.whyItWorks.title")}
          </span>
          <span className="d-md-none fw-bold" style={{ fontSize: "42px" }}>
            {t("advertisingPage.whyItWorks.title")}
          </span>

          <div className="w-100 d-flex flex-column justify-content-start align-items-start gap-3">
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
                          d-none d-xl-block fs-1
                        "
                >
                  {text}
                </span>

                <span
                  className="
                          d-none d-md-block d-xl-none fs-4
                        "
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
        {/* RIGHT SIDE – IMAGE */}
        <div className="justify-content-center flex-fill d-none d-lg-flex ">
          <img
            src={Image}
            alt="DRINQ Logo"
            className=""
            style={{ maxHeight: "700px" }}
          />
        </div>
        <div className="d-flex justify-content-center flex-fill d-lg-none ">
          <img
            src={Image}
            alt="DRINQ Logo"
            className=""
            style={{ maxHeight: "400px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default WhyItWorks;
