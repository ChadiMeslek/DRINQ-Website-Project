import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  AiOutlineMail,
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
  AiFillCaretRight,
} from "react-icons/ai";
import { useTranslation } from "react-i18next";
import LogoWhite from "../../assets/white-logo-drinq.png";
import LogoBlack from "../../assets/black-logo-drinq.png";
import "./ContactUsButton.css";

const ContactUsButtonOriginal = () => {
  const [show, setShow] = useState(false);
  const { t, i18n } = useTranslation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzQJopLozclu5ycqKerTyusA40DXILjT0sNGtEPnulDohoo8jmQGCiRiAF4IdwdG3VRxw/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      setSuccess(true);
      setLoading(false);

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        message: "",
      });

      // Close modal after success
      setTimeout(() => {
        handleClose();
        setSuccess(false);
      }, 1200);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      {/* Contact Us Button */}
      <Button
        style={{ backgroundColor: "#000", borderColor: "#000" }}
        className="px-4 py-3 fs-5 rounded-4 fw-semibold d-flex align-items-center gap-2"
        onClick={handleShow}
      >
        {t("contact_us.button")}
        <AiFillCaretRight size={18} />
      </Button>

      {/* Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        fullscreen="sm-down" // <-- Fullscreen on small devices
        centered
        size="lg"
      >
        {/* X Close Button */}
        <Button
          variant="light"
          className="position-absolute top-3 end-3 p-2 rounded-circle"
          onClick={handleClose}
          style={{ zIndex: 1051 }}
        >
          ✕
        </Button>

        <div
          className="bg-white rounded-4 d-flex flex-column flex-lg-row"
          style={{ gap: "10px" }}
        >
          {/* Left Container */}
          <div className="d-flex flex-column flex-fill">
            {/* Title */}
            <div
              className="d-flex justify-content-center align-items-center p-3"
              style={{ padding: "15px 30px" }}
            >
              <h2
                className="contact-title"
                style={{
                  fontSize: "50px",
                  fontWeight: "400",
                }}
              >
                {t("contact_us.title")}
              </h2>
            </div>

            {/* Form Container */}
            <div
              className="d-flex flex-column flex-fill"
              style={{ gap: "10px", padding: "25px 30px" }}
            >
              {/* Subtitle */}
              <div className="d-flex justify-content-center align-items-center text-center">
                <h4
                  style={{ fontSize: "24px", fontWeight: "400" }}
                  dangerouslySetInnerHTML={{ __html: t("contact_us.subtitle") }}
                />
              </div>

              {/* Form */}
              <div
                className="d-flex flex-column flex-fill"
                style={{ gap: "15px" }}
              >
                {/* Row 1 */}
                <div className="d-flex flex-column flex-lg-row gap-3">
                  <div className="flex-fill">
                    <Form.Label>{t("contact_us.first_name")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="bg-dark text-white border-light placeholder-white"
                      placeholder={t("contact_us.first_name_placeholder")}
                    />
                  </div>
                  <div className="flex-fill">
                    <Form.Label>{t("contact_us.last_name")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="bg-dark text-white border-light placeholder-white"
                      placeholder={t("contact_us.last_name_placeholder")}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="d-flex flex-column flex-lg-row gap-3">
                  <div className="flex-fill">
                    <Form.Label>{t("contact_us.business_email")}</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-dark text-white border-light placeholder-white"
                      placeholder={t("contact_us.business_email_placeholder")}
                    />
                  </div>
                  <div className="flex-fill">
                    <Form.Label>{t("contact_us.phone_number")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-dark text-white border-light placeholder-white"
                      placeholder={t("contact_us.phone_number_placeholder")}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <Form.Label>{t("contact_us.message")}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-dark text-white border-light placeholder-white"
                    placeholder={t("contact_us.message_placeholder")}
                  />
                </div>
              </div>

              {/* Send Button */}
              <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <Button
                  variant="dark"
                  className="px-4 py-2 rounded-pill"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Sending..." : t("contact_us.send_button")}
                </Button>

                {success && (
                  <div className="text-success mt-2">
                    Message sent successfully ✓
                  </div>
                )}

                {error && (
                  <div className="text-danger mt-2">Something went wrong.</div>
                )}
              </div>
              {/* Logo below on mobile */}
              <div className="d-flex flex-fill pt-4 flex-column justify-content-center align-items-center contact-logo-mobile d-lg-none">
                <img
                  src={LogoBlack}
                  alt="DRINQ Logo"
                  style={{ width: "150px", height: "auto", marginLeft: "20px" }}
                />
              </div>
            </div>
          </div>

          {/* Right Container (Desktop only) */}
          <div
            className="flex-fill bg-dark text-light d-none d-lg-flex flex-column justify-content-between align-items-center"
            style={{ padding: "30px" }}
          >
            {/* Top Section */}
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ gap: "60px" }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={LogoWhite}
                  alt="DRINQ Logo"
                  style={{ width: "150px", height: "auto" }}
                />
              </div>

              <div
                className="text-center"
                style={{
                  fontSize: "20px",
                  fontWeight: "400",
                  color: "#f8f9fa",
                }}
              >
                {t("contact_us.or_reach")}
              </div>

              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ gap: "60px" }}
              >
                <div className="d-flex flex-row gap-3">
                  <AiFillLinkedin size={35} />
                  <AiFillFacebook size={35} />
                  <AiFillInstagram size={35} />
                </div>

                <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                  <AiOutlineMail size={35} />
                  <span style={{ fontSize: "20px" }}>
                    {t("contact_us.email")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ContactUsButtonOriginal;
