import React, { useState, useEffect } from "react";
import { Route, useParams, useMatch } from "react-router-dom";
import Axios from "axios";
import getStripe from "../Lib/getStripe";
import { Link } from "react-router-dom";
import "../CSS/App.css";

function Success() {
  return (
    <div className="container w-50 maxheight">
      <div>
        <div className="display-3 mx-auto my-auto text-center mt-5">
          Thank You For Your Order!
        </div>
        <div className="d-flex">
          <div className="mx-auto">
            <Link to={`/`}>
              <button
                type="button"
                className="btn btn-outline-secondary mx-auto text-center mt-5 btn-lg"
              >
                Return Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
