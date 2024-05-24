import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header id="dtr-header-global" className="fixed-top">
      <div className="container p-0">
        <div className="d-flex align-items-center justify-content-center">
          <div className="dtr-header-right">
            <div className="main-navigation dtr-menu-dark">
              <ul
                className="sf-menu dtr-scrollspy dtr-nav dark-nav-on-load dark-nav-on-scroll dtr-menu-dark sf-js-enabled sf-arrows"
                style={{
                  touchAction: "pan-y",
                  display: "flex",
                  listStyle: "none",
                  color: "green",
                  fontSize: "20px",
                  zIndex: "1000",
                }}
              >
                <li>
                  <a className="nav-link m-2 p-2" href="#home">
                    <b>Home</b>
                  </a>
                </li>
                <li>
                  <a className="nav-link m-2 p-2" href="#about">
                    <b>About Us</b>
                  </a>
                </li>
                <li>
                  <Link className="nav-link m-2 p-2" to="/bmi">
                    <b>BMI</b>
                  </Link>
                </li>
                <li>
                  <Link className="nav-link m-2 p-2" to="/track">
                    <b>Track </b>
                  </Link>
                </li>
                <li>
                  <Link className="nav-link m-2 p-2" to="/create">
                    <b>Create Food</b>
                  </Link>
                </li>
                <li>
                  <a className="nav-link m-2 p-2" href="#footer">
                    <b>Contact</b>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
