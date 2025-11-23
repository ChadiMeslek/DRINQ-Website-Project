import React from "react";
import { Button } from "react-bootstrap";
import { AiFillCaretRight } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import "./ContactUsButton.css";

const ContactUsButton = ({ openModal }) => {
  const { t } = useTranslation();

  return (
    <Button
      style={{ backgroundColor: "#000", borderColor: "#000" }}
      className="px-4 py-3 fs-5 rounded-4 fw-semibold d-flex justify-content-center align-items-center gap-2"
      onClick={openModal}
    >
      <span>{t("contact_us.button")}</span>
      <AiFillCaretRight size={18} />
    </Button>
  );
};

export default ContactUsButton;
