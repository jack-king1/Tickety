import React, { useState, useEffect } from "react";
import { Route, useParams, useMatch } from "react-router-dom";
import Axios from "axios";
import { Buffer } from "buffer";
import "material-icons/iconfont/material-icons.css";
import UserProfile from "./UserProfile";

function Login() {
  const [loginOption, setLoginOption] = useState(true);

  //react hooks for onchange data.
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //submit data to server
  const SubmitUserDetails = () => {
    //do date checks here.
    if (username !== "" && email !== "" && password !== "") {
      console.log("Ready to submit data.");
      Axios.post("http://localhost:3001/api/createuser", {
        username: username,
        firstname: firstName,
        lastname: lastName,
        password: password,
        email: email,
      }).then((response) => {
        console.log("Register Success!", response);
      });
    }
  };

  const LoginUser = () => {
    let params = new URLSearchParams([
      ["username", username],
      ["password", password],
    ]);
    Axios.get("http://localhost:3001/api/getuserlogin", {
      params,
    }).then((response) => {
      if (response.data.length > 0) {
        console.log("User login attempt: ", response.data);
      } else {
        console.log("login failed.");
      }
    });
  };

  //Register User
  //check if username/email already exists on datachange

  //Login User

  //Form Selection
  const GetFormStyling = () => {};
  const LoginForm = () => {
    return (
      <div>
        <form>
          <div className="form-group">
            <label>Username</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
        <button
          type="button"
          onClick={() => LoginUser()}
          className="btn btn-outline-success w-100 mt-3"
        >
          Login
        </button>
      </div>
    );
  };

  const RegisterForm = () => {
    return (
      <form>
        <div className="form-group">
          <label>Username</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <div className="d-flex">
            <div className="me-4 w-50">
              <label>First Name</label>
              <input
                type="name"
                className="form-control"
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-50">
              <label>Last Name</label>
              <input
                type="name"
                className="form-control"
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={SubmitUserDetails()}
          className="btn btn-outline-success w-100 mt-3"
        >
          Register
        </button>
      </form>
    );
  };

  return (
    <div>
      <div className="container w-50 mt-3">
        <div className="d-flex text-center">
          <button
            type="button"
            className={
              "btn btn-lg btn-block w-50 " +
              (!loginOption ? "btn-primary" : "btn-outline-primary")
            }
            disabled={loginOption}
            onClick={() => setLoginOption(true)}
          >
            Login
          </button>
          <button
            type="button"
            className={
              "btn btn-lg btn-block w-50 " +
              (loginOption ? "btn-warning" : "btn-outline-warning")
            }
            disabled={!loginOption}
            onClick={() => setLoginOption(false)}
          >
            Register
          </button>
        </div>

        {loginOption ? LoginForm() : RegisterForm()}
      </div>
    </div>
  );
}

export default Login;
