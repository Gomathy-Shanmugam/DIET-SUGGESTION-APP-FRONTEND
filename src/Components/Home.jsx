import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import About from "./About";

function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <section className="banner text-center " id="home">
        <div className="container ">
          <img
            src="https://healthydietindia.com/wp-content/uploads/2021/06/logo.jpg"
            alt="logo"
            className="logo p-5"
          />

          <h1
            className="block p-3"
            style={{ color: "green", fontFamily: "cursive" }}
          >
            <b>THE TASTE OF</b>
            <span className="d-blockk">
              {" "}
              <b>GOOD HEALTH</b>
            </span>
          </h1>
          <img
            src="https://healthydietindia.com/wp-content/uploads/2021/06/shape.png"
            alt=""
            className="shape-banner p-3"
          />
          <p
            className="n-text"
            style={{ fontFamily: "sans-serif", fontSize: "22px" }}
          >
            <b>Healthy Diet is a promise to create a food culture that is</b>{" "}
            <br></br>
            <b>
              nutritious and delicious at the same time. So enjoy your meal from
            </b>
            <br></br>
            <b>Healthy Diet and stay healthy.</b>
          </p>
          <span
            className="order-info mt-4"
            data-toggle="modal"
            data-target="#myModal"
          ></span>
        </div>
      </section>
      <About></About>
      <Footer></Footer>
    </div>
  );
}

export default Home;
