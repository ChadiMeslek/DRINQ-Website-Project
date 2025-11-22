import React from "react";
import NavbarV3 from "../../components/Navbar/NavbarV3";
import ImgWTitle from "../../components/ImgWTitle/ImgWTitle";
import HowItStarted from "../../components/HowItStarted/HowItStarted";
import WhoWeAre from "../../components/WhoWeAre/WhoWeAre";
import Footer from "../../components/Footer/Footer";
import ImgWTitle2 from "../../components/ImgWTitle/ImgWTitle2";
const AboutUs = () => {
  return (
    <div>
      <div className="d-flex flex-fill flex-column">
        <NavbarV3 />
        <ImgWTitle />
      </div>
      <div className="d-flex flex-fill flex-column">
        <HowItStarted />
        <WhoWeAre />
        <ImgWTitle2 />
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
