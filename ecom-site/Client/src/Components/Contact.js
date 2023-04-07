import React, { useState, useEffect } from "react";
import "../CSS/App.css";
import "../CSS/homepage.css";
import { useSearchParams } from "react-router-dom";
import Axios from "axios";
import { Buffer } from "buffer";

function Contact() {
  //Email Sender Account
  //Email: TicketySender@outlook.com
  //Password: cRatt3EPwald
  const [contactText, setContactText] = useState("");
  const [emailText, setEmailText] = useState("");

  const CheckFields = () => {
    if (contactText != "" && emailText != "") {
      return " ";
    } else {
      return "disabled";
    }
  };

  const SendEmail = () => {
    console.log("Sending Email...");
    Axios.post("http://localhost:3001/api/sendemail", {
      contactText: contactText,
      emailText: emailText,
    }).then((response) => {
      console.log("Email Success!", response);
    });
  };

  return (
    <div className="container maxheight">
      <div className="display-4 text-black text-center">Contact</div>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address *</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmailText(e.target.value)}
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <label for="floatingTextarea2">Comments*</label>

        <div class="form-floating">
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            onChange={(e) => setContactText(e.target.value)}
          ></textarea>
        </div>
      </form>
      <button
        class={"btn btn-primary" + CheckFields()}
        onClick={() => SendEmail()}
      >
        Submit
      </button>
    </div>
  );
}

export default Contact;
