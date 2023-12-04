import React from "react";
import { NavLink } from "react-router-dom";

const Bg = () => {
  return (
    <>
      <div class="bg">
        <section class="banner">
          <div class="container">
            <div class="banner-txt">
              <h1>#1 Choice for Your Banking Needs</h1>
              <h2>
                Our Orange Card is the best option if you are looking for
                high-quality and reliable banking services.
              </h2>
              <div class="btn">
                <NavLink to="/cc">
                  {/* <a href="rr"> */}
                  <i class="far fa-window-maximize"></i> Order a Card
                  {/* </a> */}
                </NavLink>
              </div>
              <ul class="page-group">
                <li class="page">
                  <a href="r">●</a>
                </li>
                <li class="page">
                  <a href="r">●</a>
                </li>
                <li class="page">
                  <a href="r">●</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div class="pic">
          <img
            src="https://docs.google.com/uc?id=14erSKTkTshuLA5JAk9NWnvGlgHQC05KU"
            alt="rizw"
          />
        </div>
      </div>
    </>
  );
};

export default Bg;
