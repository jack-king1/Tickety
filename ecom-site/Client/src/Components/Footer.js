import "../CSS/footer.css";
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as FacebookSVG } from "../Images/facebook.svg";
import { ReactComponent as InstagramSVG } from "../Images/instagram.svg";
import { ReactComponent as YoutubeSVG } from "../Images/youtube.svg";
import Products from "./Products";

function Footer() {
  const [searchQuery, setSearchQuery] = useState();

  return (
    <div className="">
      <div className="bg-dark text-white footer-style pt-2">
        <div className="container d-flex flex-column justify-content-center">
          {/* Logo */}
          <div className="w-25 mx-auto d-flex">
            {" "}
            <img
              className="img-fluid w-100 w-sm-50 w-md-25 w-lg-25 w-xl-25 mx-auto"
              src={require("../Images/logo-white-orange.png")}
            />
          </div>

          {/* Search Bar */}
          <div class="input-group my-3 w-50 mx-auto">
            <input
              type="text"
              class="form-control"
              placeholder="Search..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div class="input-group-append">
              <Link to={`/products/${searchQuery}`}>
                <button type="button" className="btn btn-outline-warning">
                  Search
                </button>
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-secondary text-center mt-2">
            Copyright Tickert 2023. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
