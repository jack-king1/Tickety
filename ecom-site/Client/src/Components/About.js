import React from "react";
import "../CSS/App.css";
import "../CSS/homepage.css";
import "../CSS/About.css";

function About() {
  return (
    <div className="maxheight bg-blue">
      <div className="container text-white">
        <div className="text-center display-4 fw-bold">FAQ</div>
        <div className="subheader-text">
          What Is Tickety?
          <div className="body-text">
            Tikcety aims to be the all-in-one solution for business display
            creation. This involves supplying a software solution online to be
            able to create, manage and produce tickets. Alongside our easy and
            time saving software we also provide feedback and suggestions to
            make your displays look even better with help from our helpful
            experts!
          </div>
        </div>
        <div className="subheader-text mt-4">
          Why would i need Tickety?
          <div className="body-text">
            We understand creating tickets is a time consuming task so we want
            to streamline the process so you can focus on whats important!
          </div>
        </div>
        <div className="subheader-text mt-4">
          What is the price?
          <div className="body-text">
            We have two seperate pricing models depending on the volume of
            tickets you order from us and whether you will be a repeat customer
            or a one time user of Tickety, please reach out to us for more
            information.
          </div>
        </div>
        <div className="subheader-text mt-4">
          Should i just buy the printer?
          <div className="body-text">
            Yes ofcourse! We encourage customers to order a machine as it
            increases turn around time for your business! However we understand
            that some business owners don't have time to print out each ticket
            and would rather just design the tickets and leave the printing to
            the experts!
          </div>
        </div>
        <div className="subheader-text mt-4">
          What is the delivery time?
          <div className="body-text">
            Depending on your geographic location we aim for printing to be done
            within 2 business days. However we are a UK based company so we will
            get your tickets to you as fast a we can! We understand having a
            great display is important.
          </div>
        </div>
        <div className="text-center display-6 my-4 py-4">
          If you have anymore questions please reach out via our contact form!
        </div>
      </div>
    </div>
  );
}

export default About;
