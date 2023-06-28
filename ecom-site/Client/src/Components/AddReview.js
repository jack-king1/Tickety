import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Buffer } from "buffer";
import Cookies from "js-cookie";

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

  const api = Axios.create({
    baseURL: "https://ticketyapp-server-new.azurewebsites.net/",
  });

  useEffect(() => {
    GetReviewStars(5);
    //check if user is logged in
    CheckUserExists();
    setProductID(props.productID);
  }, []);

  //submit data to server
  const SubmitUserReview = () => {
    //check if user has already submitted a review before submitting.
    let currentUser = JSON.parse(Cookies.get("loginCookie"));
    if (loggedIn) {
      console.log("Ready to submit data.");
      api
        .post("reviews/createreview", {
          reviewText: reviewText,
          subID: currentUser.sub,
          productID: productID,
          anonymous: anonymousReview,
          reviewRating: reviewRating,
          username: currentUser.name,
        })
        .then((response) => {
          console.log("Register Success!", response);
          window.location.reload();
        });
    }
  };

  const CheckUserExists = async () => {
    if (
      Cookies.get("loginCookie") !== null &&
      Cookies.get("loginCookie") !== undefined
    ) {
      console.log("USER IS LOGGED IN!");
      setLoggedIn(true);
      return;
    }
    setLoggedIn(false);
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
