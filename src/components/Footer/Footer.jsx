import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ContactUsModal from "../ContactUsButton/ContactUsModal";
import "./Footer.css";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false); // modal state

  const handleLocationClick = () => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        document
          .getElementById("locations")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document
        .getElementById("locations")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = [
    { text: t("navbar.items.about"), path: "/about" },
    { text: t("navbar.items.getStarted"), path: "/get-started" },
    { text: t("navbar.items.advertising"), path: "/advertising" },
    { text: t("navbar.items.contact"), path: "/contact" },
  ];

  return (
    <>
      <div className="bg-black text-white d-flex flex-column align-items-center justify-content-center py-5">
        <Container className="d-flex flex-column align-items-center gap-4">
          <div className="desktop-social-links d-flex gap-3">
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

          <div className="custom-text footer-text d-flex gap-4 flex-wrap justify-content-center">
            {links.map((link, index) =>
              link.text === "Locations" ? (
                <span
                  key={index}
                  onClick={handleLocationClick}
                  className="text-light fw-semibold footer-text text-decoration-none"
                  style={{ cursor: "pointer" }}
                >
                  {link.text}
                </span>
              ) : link.text === "Contact Us" ? (
                <span
                  key={index}
                  onClick={() => setShowModal(true)} // open modal
                  className="text-light fw-semibold footer-text text-decoration-none"
                  style={{ cursor: "pointer" }}
                >
                  {link.text}
                </span>
              ) : (
                <Link
                  key={index}
                  to={link.path}
                  className="text-light fw-semibold footer-text text-decoration-none"
                >
                  {link.text}
                </Link>
              )
            )}
          </div>

          <div className="text-center text-light fs-6">
            © 2025 DRINQ | All Rights Reserved
          </div>
        </Container>
      </div>

      {/* Contact Us Modal */}
      <ContactUsModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
}
