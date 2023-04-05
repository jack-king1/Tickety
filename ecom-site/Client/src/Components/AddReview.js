import React, { useState, useEffect } from "react";

function AddReview() {
  const [reviewStars, setReviewStars] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    GetReviewStars(5);
    //check if user is logged in
    setLoggedIn(CheckUserExists());
  }, []);

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
    return (
      <div>
        <form>
          <div className="form-group">
            <label>Username/Name</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter username or name"
              // onChange={}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your amazing review"
              // onChange={}
            />
          </div>
        </form>
        <div className="mt-4">{reviewStars}</div>
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
          // onClick={}
          className="btn btn-outline-success w-100 mt-3"
        >
          Submit Review
        </button>
      </div>
    );
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
