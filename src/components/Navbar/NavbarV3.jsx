import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaArrowLeft } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../assets/black-logo-drinq.png";
import { Link, useLocation } from "react-router-dom";
import ContactUsModal from "../ContactUsButton/ContactUsModal";
import "./NavbarV3.css";

const NavbarV3 = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  // At the top, inside NavbarV3 component
  const [activeLang, setActiveLang] = useState(i18n.language || "en");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setActiveLang(lng);
  };

  // heights in px (adjust if you change padding/size in CSS)
  const SCROLLED_NAV_HEIGHT = 64; // height when scrolled (fixed small bar)

  useEffect(() => {
    // prevent scroll when menu open
    if (menuOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const currentScroll = window.scrollY;

      if (currentScroll <= 50) {
        // At the top → show transparent navbar
        setScrolled(false);
        document.body.classList.remove("navbar-hidden");
      } else {
        if (currentScroll > lastScrollY) {
          // scrolling DOWN → hide navbar
          document.body.classList.add("navbar-hidden");
        } else {
          // scrolling UP → show navbar
          document.body.classList.remove("navbar-hidden");
        }

        // apply scrolled style
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
  }, []);

  const navLinks = [
    { label: t("navbar.items.about"), path: "/about" },
    { label: t("navbar.items.getStarted"), path: "/get-started" },
    { label: t("navbar.items.advertising"), path: "/advertising" },
    { label: t("navbar.items.contact"), path: "/contact" },
  ];

  const handleLinkClick = () => setMenuOpen(false);

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <>
      {/* Navbar */}
      <nav
        className={`navbar-v3 navbar-expand-lg  ${
          scrolled ? "navbar-scrolled fixed-top" : "navbar-top"
        }`}
        role="navigation"
      >
        <div
          className={`container-fluid d-flex justify-content-between align-items-center gap-2 flex-column ${
            scrolled ? "px-3 py-3" : ""
          }`}
        >
          <div className="container-fluid  d-flex justify-content-between align-items-center">
            {/* Left side */}
            <div className="d-flex align-items-center gap-2 position-relative">
              {/* Hamburger mobile */}
              <button
                className="btn btn-outline-dark d-lg-none"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="open menu"
              >
                <GiHamburgerMenu size={25} />
              </button>

              {/* Languages desktop */}
              <div className="d-none d-lg-flex gap-2">
                <button
                  className={`btn btn-outline-dark language-btns ${
                    activeLang === "fr" ? "active" : ""
                  }`}
                  onClick={() => changeLanguage("fr")}
                >
                  {t("navbar.language_fr")}
                </button>
                <button
                  className={`btn btn-outline-dark language-btns ${
                    activeLang === "en" ? "active" : ""
                  }`}
                  onClick={() => changeLanguage("en")}
                >
                  {t("navbar.language_en")}
                </button>
              </div>
            </div>

            {/* Center Logo */}
            <div className="d-flex justify-content-center flex-grow-1">
              <Link to="/">
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    height: scrolled ? "55px" : "80px",
                    cursor: "pointer",
                  }}
                  className="logo-hover d-none d-sm-block"
                />
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    height: scrolled ? "30px" : "30px",
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
                  <FaFacebook size={30} color={scrolled ? "black" : "black"} />
                </a>
                <a
                  href="https://www.instagram.com/drinqofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={30} color={scrolled ? "black" : "black"} />
                </a>
              </div>

              {/* Languages mobile */}
              <div className="d-flex d-lg-none gap-2">
                <button
                  className={`btn btn-outline-dark language-btns ${
                    activeLang === "fr" ? "active" : ""
                  }`}
                  onClick={() => changeLanguage("fr")}
                >
                  {t("navbar.language_fr")}
                </button>
                <button
                  className={`btn btn-outline-dark language-btns ${
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
            {navLinks.map((link) =>
              link.label === t("navbar.items.contact") ? (
                <span
                  key={link.path}
                  className="nav-link-custom"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowModal(true)}
                >
                  {link.label}
                </span>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link-custom ${isActive(link.path)}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </nav>

      {/* When navbar becomes fixed we must insert a spacer to avoid content jump.
          The spacer is only rendered when scrolled (i.e. when nav is fixed). */}
      {scrolled && (
        <div style={{ height: `${SCROLLED_NAV_HEIGHT}px`, width: "100%" }} />
      )}

      {/* Fullscreen Mobile Menu */}
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

export default NavbarV3;
