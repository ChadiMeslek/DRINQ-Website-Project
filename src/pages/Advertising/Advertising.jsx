import React, { useState } from "react";
import VideoBgAdvertising from "../../assets/bgAdvertising.mp4";
import NavbarV3 from "../../components/Navbar/NavbarV3";
import ContactUsModal from "../../components/ContactUsButton/ContactUsModal";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AiFillCaretRight } from "react-icons/ai";
import AdvertiseDRINQ from "../../components/AdvertiseDRINQ/AdvertiseDRINQ";
import WhyItWorks from "../../components/WhyItWorks/WhyItWorks";
import Footer from "../../components/Footer/Footer";
import "./Advertising.css";
const Advertising = () => {
  const { t } = useTranslation();

  // ⬅️ Add modal state
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="d-flex flex-column">
      <NavbarV3 />

      <div
        className="position-relative w-100"
        style={{ maxHeight: "750px", overflow: "hidden" }}
      >
        <video
          src={VideoBgAdvertising}
          autoPlay
          loop
          muted
          playsInline
          className="w-100"
          style={{ objectFit: "cover", height: "750px" }}
        />

        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0, 0, 0, 0.0)" }}
        />

        <div
          className="position-absolute top-50 text-white w-100"
          style={{ transform: "translateY(-50%)" }}
        >
          <div className="text-md-start text-center ps-md-5 ps-lg-4 ps-xl-5">
            {/* Desktop H1 */}
            <h1
              className="fw-bold mb-4 d-none d-xl-block"
              style={{ fontSize: "95px" }}
            >
              {t("advertisingPage.hero.title")}
            </h1>

            {/* Mobile / Tablet H1 */}
            <h1
              className="fw-bold mb-4 d-block d-xl-none"
              style={{ fontSize: "45px" }}
            >
              {t("advertisingPage.hero.title")}
            </h1>

            <div className="d-md-block d-flex justify-content-center">
              <Button
                style={{
                  backgroundColor: "white",
                  borderColor: "white",
                }}
                onClick={openModal}
                className="button-advertising start-advertising-btn px-2 py-2 px-xl-4 py-xl-3 text-black rounded-4 fw-semibold d-flex align-items-center gap-2"
              >
                {t("advertisingPage.hero.button")}
                <AiFillCaretRight size={18} style={{ color: "black" }} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AdvertiseDRINQ />
      <WhyItWorks />
      <Footer />

      {/* ⬅️ Add the modal at the bottom */}
      <ContactUsModal show={showModal} handleClose={closeModal} />
    </div>
  );
};

export default Advertising;
