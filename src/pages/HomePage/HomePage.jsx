import React from "react";
import VideoBg from "../../assets/bg-Home.mp4";
import NavbarV2 from "../../components/Navbar/NavbarV2";
import "./HomePage.css";
import WhatIsDrinq from "../../components/WhatIsDrinq/WhatIsDrinq";
import DRINQBenefits from "../../components/DRINQBenefits/DRINQBenefits";
import MyLocations from "../../components/MyLocations/MyLocations";
import OurClients from "../../components/OurClients/OurClients";
import HomeContact from "../../components/HomeContact/HomeContact";
import Footer from "../../components/Footer/Footer";
import { useTranslation } from "react-i18next";
export default function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      {/* HERO SECTION */}
      <div className="home-container">
        <video
          src={VideoBg}
          autoPlay
          loop
          muted
          playsInline
          className="home-video"
        />

        <div className="home-overlay"></div>

        <div className="home-content">
          <NavbarV2 />

          <div className="home-center">
            <h1 className="home-title">{t("homePage.hero.title")}</h1>
            <p className="home-tagline">{t("homePage.hero.tagline")}</p>
          </div>
        </div>
      </div>

      {/* REST OF THE PAGE (OUTSIDE CONTAINER!) */}
      <WhatIsDrinq />
      <DRINQBenefits />
      <div id="locations">
        <MyLocations />
      </div>
      <OurClients />
      <HomeContact />
      <Footer />
    </>
  );
}
