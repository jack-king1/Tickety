import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/homepage.css";
import BgImage from "../Images/printer.png";
import { ReactComponent as ClipboardSVG } from "../Images/icon-clipboard.svg";
import { ReactComponent as EyeSVG } from "../Images/icon-eye.svg";
import { ReactComponent as FoodsafeSVG } from "../Images/icon-food-safe.svg";
import { ReactComponent as StopwatchSVG } from "../Images/icon-stop-watch.svg";
import { ReactComponent as FacebookSVG } from "../Images/facebook.svg";

function Home() {
  return (
    <div className="background-review">
      <div className="jumbotron-color w-100">
        <div className="container h-100">
          <div className="d-flex flex-column-reverse flex-xl-row flex-md-row flex-lg-row flex-sm-column h-100 justify-content-center">
            <div className="text-end w-75 my-auto display-6 fw-bold">
              <span className="accent-text fw-bold">All-In-One Solution </span>
              To Your
              <span className="underline-text"> Business Display Needs!</span>
              <div>
                <button className="btn btn-large btn-primary">More Info</button>
              </div>
            </div>

            <div className="text-center w-75 my-auto mx-auto">
              <img
                className="img-fluid w-75"
                alt="not found"
                width={"250px"}
                src={BgImage}
              />
            </div>
          </div>
        </div>
      </div>

      {/*Benefits */}
      <div>
        <div className="row container justify-content-center mx-auto">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <div className="d-flex">
              <div>
                <ClipboardSVG className="circle-image" />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">benefit 2</div>
        </div>
        <div className="row container justify-content-center mx-auto">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">benefit 3</div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">benefit 4</div>
        </div>
      </div>

      <div className="w-100 pb-4">
        <div className="text-center display-4 fw-bold">
          {/* <span className="text-white fw-bold">What Our Customers Said!</span> */}
        </div>
        <div className="container h-100">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 justify-content-center d-flex flex-column">
              <img
                className="img-fluid w-75 round-img"
                src={require("../Images/reviewer-1.jpg")}
              />
              <div className="text-white fw-bold text-center">Josh M.</div>
              <div className="text-center text-white fw-bold review-text pb-4 mb-4">
                "Since using Tickety, having the ability to quickly edit and
                print tickets on demand is so useful!"
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 justify-content-center d-flex flex-column">
              <img
                className="img-fluid w-75 round-img"
                src={require("../Images/reviewer-2.jpg")}
              />
              <div className="text-white fw-bold text-center">Samantha Z.</div>
              <div className="text-center text-white fw-bold review-text pb-4 mb-4">
                "Works great for our farm shop! The amount of time this service
                saves us is so helpful!"
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 justify-content-center d-flex flex-column">
              <img
                className="img-fluid w-75 round-img"
                src={require("../Images/reviewer-3.jpg")}
              />
              <div className="text-white fw-bold text-center">Alex F.</div>
              <div className="text-center text-white fw-bold review-text  pb-4 mb-4">
                "Easy to clean, Easy to change,it's game changer for it's ease
                of use! Definitely worth every penny!"
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="jumbotron w-100">
        <div className="container h-100">
          <div className="d-flex h-100 justify-content-center"></div>
        </div>
      </div> */}

      <div className="pb-4">
        <div id="carouselExampleCaptions" className="carousel slide container">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner background-orange">
            <div className="carousel-item active">
              <img
                src={require("../Images/printer-carousel.png")}
                className="d-block w-100 mx-auto img-fluid"
                alt="..."
              />
              <div className="carousel-caption d-none d-lg-block text-black">
                <h5>Ticket Batch Printer</h5>
                <p>
                  Print hundreds at a time and watch your hard work become
                  reality!
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={require("../Images/tickets-carousel.png")}
                className="d-block w-100 mx-auto img-fluid"
                alt="..."
              />
              <div className="carousel-caption d-none d-lg-block text-black">
                <h5>Different Ticket Types</h5>
                <p>
                  Different colours and sizes to ensure you get that perfect
                  display!
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src={require("../Images/ticketstands-carousel.png")}
                className="d-block w-100 mx-auto img-fluid"
                alt="..."
              />
              <div class="carousel-caption d-none d-lg-block text-black">
                <h5>Ticket Holders</h5>
                <p>
                  Place your display tickets above the products so they stand
                  out easier!
                </p>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
