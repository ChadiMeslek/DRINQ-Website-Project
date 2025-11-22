import React, { useState } from "react";
import "./HomeContact.css";
import ContactImg from "../../assets/ContactImg.png";
import ContactUsButton from "../ContactUsButton/ContactUsButton";
import ContactUsModal from "../ContactUsButton/ContactUsModal";
import { useTranslation } from "react-i18next";
const HomeContact = () => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="contact-container-wrapper">
      <div className="contact-container">
        {/* IMAGE */}
        <img src={ContactImg} alt="Contact" className="contact-img" />

        {/* TEXT + BUTTON */}
        <div className="contact-text d-flex flex-column justify-content-center align-items-center">
          <p className="contact-title text-center fw-bold">
            {t("homePage.homeContact.title")}
          </p>
          <p className="contact-subtitle text-center fw-normal">
            {t("homePage.homeContact.subtitle")}
          </p>

          {/* Pass openModal to button */}
          <ContactUsButton openModal={openModal} />
        </div>
      </div>

      {/* Contact Modal */}
      <ContactUsModal show={showModal} handleClose={closeModal} />
    </div>
  );
};

export default HomeContact;
