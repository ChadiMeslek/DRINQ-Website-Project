import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import BgImage from "../../assets/bg-GetStarted.png";
import ContactUsModal from "../../components/ContactUsButton/ContactUsModal";
import {
  FaPeopleArrows,
  FaSearchLocation,
  FaHandshake,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./GetStartedPage.css";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "../../components/Footer/Footer";
import NavbarV2 from "../../components/Navbar/NavbarV2";
import "./GetStartedPage.css";
const icons = [
  <FaPeopleArrows size={30} color="white" />,
  <FaSearchLocation size={30} color="white" />,
  <FaHandshake size={30} color="white" />,
  <FaMoneyBillWave size={30} color="white" />,
];

const GetStartedPage = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const isMobile = typeof window !== "undefined" && window.innerWidth < 992;

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [captchaToken, setCaptchaToken] = useState(null);
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

    if (!captchaToken) {
      alert("Please complete the reCAPTCHA before submitting.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please complete the reCAPTCHA before submitting.");
      return false;
    }

    if (!isFormValid()) return;

    setLoading(true);
    setSuccess(false);

    try {
      await fetch(process.env.REACT_APP_GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      setSuccess(true);
      setLoading(false);
      setFormData({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        message: "",
      });
      setCaptchaToken(null); // reset captcha
    } catch {
      setLoading(false);
    }
  };

  const steps = t("getStartedPage.steps", { returnObjects: true });

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NavbarV2 />

        <div
          className="d-flex flex-column  pt-lg-5 flex-lg-row flex-grow-1"
          style={{ gap: "10px" }}
        >
          {/* LEFT SIDE – unchanged */}
          <div className="flex-fill d-flex" style={{ padding: "13px 39px" }}>
            <div
              className="flex-fill d-flex flex-column"
              style={{ gap: "25px" }}
            >
              <div className="d-flex flex-column" style={{ gap: "5px" }}>
                <h1
                  style={{ fontWeight: 600, fontSize: "48px", color: "white" }}
                >
                  {t("getStartedPage.title")}
                </h1>
                <p
                  style={{
                    fontWeight: 300,
                    fontSize: "20px",
                    color: "white",
                    lineHeight: "1.5",
                  }}
                >
                  {t("getStartedPage.subtitle")}
                </p>
              </div>

              <div className="d-flex flex-column" style={{ gap: "24px" }}>
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="d-flex flex-column"
                    style={{ gap: "5px" }}
                  >
                    <div
                      className="d-flex align-items-center"
                      style={{ gap: "10px" }}
                    >
                      {icons[index]}
                      <h3
                        style={{
                          fontWeight: 700,
                          fontSize: "20px",
                          color: "white",
                        }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p
                      style={{
                        fontWeight: 300,
                        fontSize: "20px",
                        color: "white",
                        lineHeight: "1.4",
                      }}
                    >
                      {step.subtitle}
                    </p>
                  </div>
                ))}

                <p
                  style={{
                    color: "white",
                    fontWeight: 500,
                    fontSize: "20px",
                  }}
                >
                  {t("getStartedPage.finalText")}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE – NEW FORM WITH BOOTSTRAP */}
          <div
            className="col-lg-6 d-none d-md-flex justify-content-center align-items-start"
            style={{ padding: "72px 30px" }}
          >
            <Form
              onSubmit={handleSubmit}
              className="d-flex flex-column bg-dark contact-light-form"
              style={{
                borderRadius: "50px",
                padding: "44px 33px",
                gap: "25px",
                width: "100%",
                maxWidth: "650px",
              }}
            >
              <h2 style={{ color: "white", textAlign: "center" }}>
                {t("getStartedPage.cardTitle")}
              </h2>

              {/* FIRST + LAST NAME */}
              <div className="d-flex flex-row flex-fill gap-3">
                <Form.Group className="d-flex flex-fill">
                  <Form.Control
                    type="text"
                    name="first_name"
                    placeholder={t("contact_us.first_name")}
                    value={formData.first_name}
                    onChange={handleChange}
                    className="bg-white border-0"
                    style={{ borderRadius: "14px", padding: "16px 12px" }}
                  />
                </Form.Group>

                <Form.Group className="flex-fill">
                  <Form.Control
                    type="text"
                    name="last_name"
                    placeholder={t("contact_us.last_name")}
                    value={formData.last_name}
                    onChange={handleChange}
                    className="bg-white border-0"
                    style={{ borderRadius: "14px", padding: "16px 12px" }}
                  />
                </Form.Group>
              </div>

              {/* PHONE */}
              <Form.Group>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder={t("contact_us.phone_number")}
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-white border-0"
                  style={{ borderRadius: "14px", padding: "16px 12px" }}
                />
              </Form.Group>

              {/* EMAIL */}
              <Form.Group>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder={t("contact_us.business_email")}
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white border-0"
                  style={{ borderRadius: "14px", padding: "16px 12px" }}
                />
              </Form.Group>

              {/* MESSAGE */}
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  placeholder={t("contact_us.message")}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-white border-0"
                  style={{
                    borderRadius: "14px",
                    padding: "16px 12px",
                    resize: "none",
                    height: "120px",
                  }}
                />
              </Form.Group>
              <div className="my-3 d-flex justify-content-center">
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  onChange={(token) => setCaptchaToken(token)}
                />
              </div>
              {/* SUBMIT */}
              <div className="d-flex justify-content-center w-100">
                <Button
                  type="submit"
                  className="d-flex align-items-center justify-content-center send-btn"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "44px",
                    gap: "12px",
                    padding: "12px 100px",
                    border: "none",
                  }}
                  disabled={loading}
                >
                  {loading ? "Sending..." : t("getStartedPage.cardButton")}
                </Button>
              </div>

              {/* SUCCESS MESSAGE */}
              {success && (
                <div className="d-flex flex-fill justify-content-center align-items-center text-success fw-bold mt-2">
                  Message sent successfully ✓
                </div>
              )}
            </Form>
          </div>
          <div className="d-flex d-md-none justify-content-center p-4">
            <button
              className="btn btn-light w-100 py-3 send-btn"
              style={{
                borderRadius: "40px",
                fontSize: "20px",
                fontWeight: "600",
              }}
              onClick={() => setShowModal(true)}
            >
              {t("getStartedPage.cardTitle")}
            </button>
          </div>
          <ContactUsModal
            show={showModal}
            handleClose={() => setShowModal(false)}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GetStartedPage;
