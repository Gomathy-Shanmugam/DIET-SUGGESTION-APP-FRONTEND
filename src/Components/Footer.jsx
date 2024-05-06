import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faWhatsapp,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "../App.css";

function Footer() {
  return (
    <section id="footer">
      <footer className="bg-black text-light text-center py-3">
        <div className="container">
          <p>Contact Us</p>
          <div className="icon-container  ">
            <Link to="https://www.facebook.com">
              <FontAwesomeIcon
                className="fa-2x me-4 icon"
                icon={faFacebook}
                style={{ color: "white" }}
              />
            </Link>
            <Link to="https://wa.me/">
              <FontAwesomeIcon
                className="fa-2x me-4 icon"
                icon={faWhatsapp}
                style={{ color: "white" }}
              />
            </Link>
            <Link to="www.linkedin.com/in/gomathy-s-9a663923a">
              <FontAwesomeIcon
                className="fa-2x me-4 icon"
                icon={faLinkedin}
                style={{ color: "white" }}
              />
            </Link>
            <Link to="https://www.instagram.com">
              <FontAwesomeIcon
                className="fa-2x me-4 icon"
                icon={faInstagram}
                style={{ color: "white" }}
              />
            </Link>
          </div>

          <p>
            <b>123 Main road,Chennai-600500</b>
          </p>
          <p>
            <b> +91 9888877777</b>
          </p>
          <p>@ copyright all rights reserved</p>
        </div>
      </footer>
    </section>
  );
}

export default Footer;
