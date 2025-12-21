import React, { useState } from "react";
import { Modal, Button, Form, FormGroup } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import LogoWhite from "../../assets/white-logo-drinq.png";
import LogoBlack from "../../assets/black-logo-drinq.png";
import "./ContactUsButton.css";
import ReCAPTCHA from "react-google-recaptcha";

const ContactUsModal = ({ show, handleClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    heard_from: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const isFormValid = () => {
    if (
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill out all fields before submitting.");
      return false;
    }

    if (!isValidEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!isValidPhone(formData.phone)) {
      alert("Please enter a 10-digit phone number.");
      return false;
    }

    if (!captchaToken) {
      alert("Please complete the reCAPTCHA before submitting.");
      return false;
    }

    if (formData.heard_from.length === 0) {
      alert(t("contact_us.heard_from.required"));
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return; // validation alerts already handled
    }

    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const body = new URLSearchParams({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ""),
        heard_from: formData.heard_from,
        message: formData.message,
        captcha: captchaToken, // send captcha token to your Google Script
      }).toString();

      await fetch(process.env.REACT_APP_GOOGLE_SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      setSuccess(true);
      setLoading(false);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        heard_from: "",
        message: "",
      });
      setCaptchaToken(null);

      setTimeout(() => {
        handleClose();
        setSuccess(false);
      }, 1200);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      fullscreen="sm-down"
      centered
      size="lg"
    >
      {/* Close Button */}
      <Button
        variant="light"
        className="position-absolute top-3 end-3 p-2 "
        onClick={handleClose}
        style={{ zIndex: 1051 }}
      >
        ✕
      </Button>

      {/* Modal content (reuse your existing layout) */}
      <div
        className="bg-white rounded-4 d-flex flex-column flex-lg-row"
        style={{ gap: "10px" }}
      >
        {/* Left Container */}
        <div className="d-flex flex-column flex-fill">
          <div className="d-flex justify-content-center align-items-center p-3">
            <h2
              className="contact-title d-none d-md-block"
              style={{ fontSize: "50px", fontWeight: 400 }}
            >
              {t("contact_us.title")}
            </h2>

            <h2
              className="contact-title d-md-none"
              style={{ fontSize: "40px", fontWeight: 400 }}
            >
              {t("contact_us.title")}
            </h2>
          </div>

          <div
            className="d-flex flex-column flex-fill"
            style={{ gap: "10px", padding: "25px 30px" }}
          >
            <div className="d-flex justify-content-center align-items-center text-center">
              <h4
                style={{ fontSize: "24px", fontWeight: 400 }}
                dangerouslySetInnerHTML={{ __html: t("contact_us.subtitle") }}
              />
            </div>

            <div
              className="d-flex flex-column flex-fill contact-dark-form"
              style={{ gap: "15px" }}
            >
              {/* Form Rows */}
              <div className="d-flex flex-fill justify-content-between flex-column flex-lg-row w-100 gap-2">
                <Form.Group className="w-100">
                  <Form.Label>
                    {t("contact_us.first_name")}{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="bg-dark text-white border-light placeholder-white"
                    placeholder={t("contact_us.first_name_placeholder")}
                  />
                </Form.Group>
                <Form.Group className="w-100">
                  <Form.Label>
                    {t("contact_us.last_name")}{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="bg-dark text-white border-light placeholder-white"
                    placeholder={t("contact_us.last_name_placeholder")}
                  />
                </Form.Group>
              </div>

              <div className="d-flex flex-fill justify-content-between flex-column flex-lg-row w-100 gap-2">
                <Form.Group className="w-100">
                  <Form.Label>
                    {t("contact_us.business_email")}{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-dark text-white border-light placeholder-white"
                    placeholder={t("contact_us.business_email_placeholder")}
                  />
                </Form.Group>
                <Form.Group className="w-100">
                  <Form.Label>
                    {t("contact_us.phone_number")}{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="d-flex">
                    <span
                      className="d-flex align-items-center px-2 bg-dark text-white border-light rounded-start"
                      style={{
                        fontSize: "1rem",
                        borderRight: "white 1px solid",
                      }}
                    >
                      +1
                    </span>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-dark text-white flex-fill border-dark placeholder-white"
                      style={{ borderRadius: "0px 5px 5px 0px" }}
                      placeholder={t("contact_us.phone_number_placeholder")}
                      maxLength={10}
                    />
                  </div>
                </Form.Group>
              </div>

              <Form.Group className="contact-dark-form">
                <Form.Label>
                  {t("contact_us.heard_from.label")}{" "}
                  <span className="text-danger">*</span>
                </Form.Label>

                <Form.Select
                  name="heard_from"
                  value={formData.heard_from}
                  onChange={handleChange}
                  className="bg-dark text-white border-light"
                  required
                >
                  <option value="" disabled hidden>
                    - Select -
                  </option>

                  <option value="gym">
                    {t("contact_us.heard_from.options.gym")}
                  </option>
                  <option value="google">
                    {t("contact_us.heard_from.options.google")}
                  </option>
                  <option value="social">
                    {t("contact_us.heard_from.options.social")}
                  </option>
                  <option value="referral">
                    {t("contact_us.heard_from.options.referral")}
                  </option>
                  <option value="other">
                    {t("contact_us.heard_from.options.other")}
                  </option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  {t("contact_us.message")}{" "}
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-dark text-white border-light placeholder-white"
                  placeholder={t("contact_us.message_placeholder")}
                />
              </Form.Group>
            </div>

            <div className="my-3 d-flex justify-content-center">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>
            <div className="d-flex flex-fill flex-column mt-3">
              <Button
                variant="dark"
                className="d-flex flex-fill px-4 py-2 justify-content-center align-items-center rounded-pill send-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Sending..." : t("contact_us.send_button")}
              </Button>

              {success && (
                <div className="d-flex flex-fill justify-content-center align-items-center text-success mt-2">
                  Message sent successfully ✓
                </div>
              )}
              {error && (
                <div className="d-flex flex-fill justify-content-center align-items-center text-danger mt-2">
                  Something went wrong.
                </div>
              )}
            </div>

            <div className="d-flex flex-fill pt-4 flex-column justify-content-center align-items-center contact-logo-mobile d-lg-none">
              <img
                src={LogoBlack}
                alt="DRINQ Logo"
                style={{ width: "150px", height: "auto", marginLeft: "17px" }}
              />
            </div>
          </div>
        </div>

        {/* Right Container (Desktop only) */}
        <div
          className="flex-fill bg-dark text-light d-none d-lg-flex flex-column justify-content-between align-items-center"
          style={{ padding: "30px" }}
        >
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ gap: "60px" }}
          >
            <img
              src={LogoWhite}
              alt="DRINQ Logo"
              style={{ width: "150px", height: "auto" }}
            />
            <div
              style={{ fontSize: "20px", fontWeight: 400, color: "#f8f9fa" }}
            >
              {t("contact_us.or_reach")}
            </div>
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ gap: "60px" }}
            >
              <div className="desktop-social-links d-none d-lg-flex gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61583292343959"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={30} color="white" />
                </a>
                <a
                  href="https://www.instagram.com/drinqofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={30} color="white" />
                </a>
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
  );
};

export default ContactUsModal;
