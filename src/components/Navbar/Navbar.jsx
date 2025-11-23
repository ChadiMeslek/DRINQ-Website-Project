import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaArrowLeft } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../assets/white-logo-drinq.png";
import { Link, useLocation } from "react-router-dom";
import ContactUsModal from "../ContactUsButton/ContactUsModal"; // <-- import modal
import "./Navbar.css";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // <-- modal state
  const location = useLocation();
  // Set default from i18n
  const [activeLang, setActiveLang] = useState(i18n.language || "fr");

  const [scrolled, setScrolled] = useState(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 992;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setActiveLang(lng);
  };
  const handleLinkClick = () => setMenuOpen(false);

  useEffect(() => {
    if (menuOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!isMobile) return; // ❌ disable all scroll effects on desktop

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const currentScroll = window.scrollY;

      if (currentScroll <= 50) {
        setScrolled(false);
        document.body.classList.remove("navbar-hidden");
      } else {
        if (currentScroll > lastScrollY) {
          document.body.classList.add("navbar-hidden"); // down
        } else {
          document.body.classList.remove("navbar-hidden"); // up
        }
        setScrolled(true);
      }

      lastScrollY = currentScroll;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const SCROLLED_NAV_HEIGHT = 64;

  return (
    <>
      {/* Navbar */}
      <nav
        className={`navbar-v1 navbar-expand-lg  ${
          scrolled ? "navbar-v1-scrolled" : "navbar-top"
        } ${isMobile ? "fixed-top" : ""}`}
      >
        <div
          className={`container-fluid d-flex justify-content-between align-items-center gap-2 flex-column ${
            scrolled ? "px-3 py-3" : ""
          }`}
        >
          <div className="container-fluid d-flex justify-content-between align-items-center">
            {/* Left side */}
            <div className="d-flex align-items-center gap-2 position-relative">
              {/* Hamburger (mobile) */}
              <button
                className="btn btn-outline-light d-lg-none"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <GiHamburgerMenu size={25} />
              </button>

              {/* Languages desktop */}
              <div className="d-none d-lg-flex gap-2">
                <button
                  className={`btn btn-outline-light language-btns ${
                    activeLang === "fr" ? "active" : ""
                  }`}
                  onClick={() => changeLanguage("fr")}
                >
                  {t("navbar.language_fr")}
                </button>
                <button
                  className={`btn btn-outline-light language-btns ${
                    activeLang === "en" ? "active" : ""
                  }`}
                  onClick={() => changeLanguage("en")}
                >
                  {t("navbar.language_en")}
                </button>
              </div>
            </div>

            {/* Center: Logo */}
            <div className="d-flex justify-content-center flex-grow-1">
              <Link to="/">
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    height: scrolled ? "40px" : "80px",
                    cursor: "pointer",
                  }}
                  className="logo-hover d-none d-sm-block"
                />
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    height: scrolled ? "22px" : "30px",
                    cursor: "pointer",
                  }}
                  className="logo-hover d-block d-sm-none"
                />
              </Link>
            </div>

            {/* Right side */}
            <div className="d-flex align-items-center gap-2">
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

              {/* Languages mobile */}
              <div className="d-flex d-lg-none gap-2">
                <button
                  className={`btn btn-outline-light language-btns ${
                    activeLang === "fr" ? "active" : ""
                  }`}
                  onClick={() => changeLanguage("fr")}
                >
                  {t("navbar.language_fr")}
                </button>

                <button
                  className={`btn btn-outline-light language-btns ${
                    activeLang === "en" ? "active" : ""
                  }`}
                  onClick={() => changeLanguage("en")}
                >
                  {t("navbar.language_en")}
                </button>
              </div>
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="container-fluid d-flex flex-row justify-content-center align-items-center pt-3 gap-5 d-none d-lg-flex">
            <Link to="/about" className={`nav-item-link ${isActive("/about")}`}>
              {t("navbar.items.about")}
            </Link>
            <Link
              to="/get-started"
              className={`nav-item-link ${isActive("/get-started")}`}
            >
              {t("navbar.items.getStarted")}
            </Link>
            <Link
              to="/advertising"
              className={`nav-item-link ${isActive("/advertising")}`}
            >
              {t("navbar.items.advertising")}
            </Link>
            <span
              className="nav-item-link"
              style={{ cursor: "pointer" }}
              onClick={() => setShowModal(true)} // <-- open modal
            >
              {t("navbar.items.contact")}
            </span>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu */}
      {isMobile && scrolled && (
        <div style={{ height: `${SCROLLED_NAV_HEIGHT}px`, width: "100%" }} />
      )}
      <div
        className={`fullscreen-menu-overlay ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className="fullscreen-menu-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-menu-btn" onClick={() => setMenuOpen(false)}>
            <FaArrowLeft size={24} />
            <span>Back</span>
          </button>

          <div className="mobile-nav-links">
            <Link
              to="/"
              className={`mobile-nav-link ${isActive("/")}`}
              onClick={handleLinkClick}
            >
              {t("navbar.items.home")}
            </Link>
            <Link
              to="/about"
              className={`mobile-nav-link ${isActive("/about")}`}
              onClick={handleLinkClick}
            >
              {t("navbar.items.about")}
            </Link>
            <Link
              to="/get-started"
              className={`mobile-nav-link ${isActive("/get-started")}`}
              onClick={handleLinkClick}
            >
              {t("navbar.items.getStarted")}
            </Link>
            <Link
              to="/advertising"
              className={`mobile-nav-link ${isActive("/advertising")}`}
              onClick={handleLinkClick}
            >
              {t("navbar.items.advertising")}
            </Link>
            <span
              className="mobile-nav-link"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShowModal(true);
                handleLinkClick();
              }}
            >
              {t("navbar.items.contact")}
            </span>
          </div>

          <div className="mobile-social-links">
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
        </div>
      </div>

      {/* Contact Us Modal */}
      <ContactUsModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
};

export default Navbar;
