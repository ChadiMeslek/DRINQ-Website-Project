import React from "react";
import logo1 from "../../assets/ClientsLogos/beauharnois_transparent.png";
import logo2 from "../../assets/ClientsLogos/valleyfield_transparent.png";
import { useTranslation } from "react-i18next";

export default function OurClients() {
  const logos = [logo1, logo2];
  const { t } = useTranslation();

  return (
    <div
      className="d-flex flex-column align-items-center px-3 py-4"
      style={{ gap: "30px" }}
    >
      {/* Title */}
      <div className="text-center fw-bold">
        <span className="d-none d-md-block" style={{ fontSize: "75px" }}>
          {t("homePage.ourClients.title")}
        </span>
        <span className="d-md-none" style={{ fontSize: "42px" }}>
          {t("homePage.ourClients.title")}
        </span>
      </div>

      {/* Logos side by side */}
      <div
        className="d-flex justify-content-center align-items-center flex-wrap"
        style={{ gap: "50px" }}
      >
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Client ${index + 1}`}
            className="client-logo"
          />
        ))}
      </div>

      {/* Inline CSS for responsive logo sizing */}
      <style jsx>{`
        .client-logo {
          max-height: 400px;
          object-fit: contain;
        }

        @media (max-width: 768px) {
          .client-logo {
            max-height: 150px; /* smaller on mobile */
          }
        }
      `}</style>
    </div>
  );
}
