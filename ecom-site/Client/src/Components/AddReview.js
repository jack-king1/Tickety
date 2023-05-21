import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Buffer } from "buffer";

function AddReview(props) {
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewStars, setReviewStars] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  //User review details
  const [reviewText, setReviewText] = useState("");
  const [accountID, setAccountID] = useState(-1);
  const [productID, setProductID] = useState(-1);
  const [anonymousReview, setAnonymousReview] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    GetReviewStars(5);
    //check if user is logged in
    setLoggedIn(CheckUserExists());
    setProductID(props.productID);
    let tempID = localStorage.getItem("accountID");
    setAccountID(tempID);
    let tempUsername = localStorage.getItem("username");
    setUsername(tempUsername);
  }, []);

  //submit data to server
  const SubmitUserReview = () => {
    //check if user has already submitted a review before submitting.
    if (accountID !== "") {
      console.log("Ready to submit data.");
      Axios.post("http://localhost:3001/api/createreview", {
        reviewText: reviewText,
        accountID: accountID,
        productID: productID,
        anonymous: anonymousReview,
        reviewRating: reviewRating,
        username: username,
      }).then((response) => {
        console.log("Register Success!", response);
      });
    }
  };

  const CheckUserExists = () => {
    let loggedIn = false;
    if (
      localStorage.getItem("username") !== null ||
      localStorage.getItem("username")
    ) {
      loggedIn = true;
    }
    return loggedIn;
  };

  const GetReviewStars = (rating) => {
    setReviewRating(rating);
    console.log("Rating Star", rating);
    let reviewStars = [];
    for (let i = 0; i < 5; i++) {
      if (rating > i) {
        //Half star check
        if (5 > i && 5 < i + 1) {
          reviewStars.push(
            <span className="material-icons-outlined text-warning">
              star_half
            </span>
          );
        } else {
          reviewStars.push(
            <span className="material-icons-outlined text-warning">star</span>
          );
        }
      } else {
        reviewStars.push(
          <span className="material-icons-outlined">star_border</span>
        );
      }
    }

    setReviewStars(reviewStars);
  };

  const LoginToReview = () => {
    return <div className="fw-bold pt-4">Login To Review</div>;
  };

  const GetReview = () => {
    //Need to check if user has already left a review for this product.
    if (props.reviewComplete) {
      return (
        <div className="display-6">Thank you for reviewing our product!</div>
      );
    } else {
      return (
        <div>
          <form>
            <div className="form-group">
              <label>Review</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setReviewText(e.target.value)}
              />
            </div>
            <div class="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onChange={() => setAnonymousReview(!anonymousReview)}
              />
              <label class="form-check-label" for="flexCheckDefault">
                Anonymous Review
              </label>
            </div>
          </form>

          <div className="d-flex mt-4">
            <div className="me-2">{reviewStars} </div>
            <div className="fw-bold">{reviewRating}</div>
          </div>

          <input
            type="range"
            className="form-range w-50 "
            min="0"
            max="5"
            id="customRange2"
            onChange={(e) => GetReviewStars(e.target.value)}
            defaultValue={5}
          />

          <button
            type="button"
            onClick={() => SubmitUserReview()}
            className="btn btn-outline-success w-100 mt-3"
          >
            Submit Review
          </button>
        </div>
      );
    }
  };

  return (
    <div className="my-4">
      <div>
        <div className="display-6">Add Review</div>
        <div>{loggedIn ? GetReview() : LoginToReview()}</div>
      </div>
    </div>
  );
}

export default AddReview;
