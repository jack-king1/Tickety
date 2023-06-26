import React, { useState, useEffect } from "react";
import { Route, useParams, useMatch } from "react-router-dom";
import Axios from "axios";
import { Buffer } from "buffer";
import "material-icons/iconfont/material-icons.css";
import UserProfile from "./UserProfile";
import "../CSS/App.css";
import Loading from "../Components/Loading";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

import { GoogleLogin, useGoogleLogin, googleLogout } from "@react-oauth/google";

//https://blog.logrocket.com/guide-adding-google-login-react-app/#:~:text=Run%20either%20of%20the%20below%20commands%20to%20install,app%20can%20access%20the%20Google%20Auth%20Provider%20once.

function Login() {
  const api = Axios.create({
    baseURL:
      process.env.REACT_APP_SERVER_URL ||
      "https://ticketyapp-server-new.azurewebsites.net/",
  });
  const [loginOption, setLoginOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //react hooks for onchange data.
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  //submit data to server
  const SubmitUserDetails = async (userObj) => {
    //do date checks here.
    //Check if user a;ready exists

    if (username !== "" && email !== "" && password !== "") {
      console.log("Ready to submit data.");
      setIsLoading(true);
      await api
        .post("account/createuser", {
          username: userObj.name,
          firstname: userObj.given_name,
          lastname: userObj.family_name,
          password: "password",
          email: email,
          profileImgURL: userObj.picture,
        })
        .then((response) => {
          setIsLoading(false);
          console.log("Register Success!", response);
        });
    }
  };

  const LogoutForm = () => {
    return (
      <div className="h-100">
        <button
          className="btn btn-danger btn-large w-100 p-4 btn-block border-0 align-bottom"
          onClick={() => Logoutuser()}
        >
          Logout
        </button>
      </div>
    );
  };

  const Logoutuser = () => {
    Cookies.remove("loginCookie");
    localStorage.clear();
    window.location.reload();
  };

  const LoginUser = async () => {
    let params = new URLSearchParams([
      ["username", username],
      ["password", password],
    ]);
    setIsLoading(true);
    await api
      .get("account/getuserlogin", {
        params,
      })
      .then((response) => {
        if (response.data.length > 0) {
          console.log("User login attempt: ", response.data);
          SetSessionData(response.data[0]);
          window.location.reload();
        } else {
          console.log("login failed.");
        }
        setIsLoading(false);
      });
  };

  const LoginDemoUser = async () => {
    let params = new URLSearchParams([["username", "demo"]]);
    setIsLoading(true);
    await api
      .get("account/getuserlogin", {
        params,
      })
      .then((response) => {
        if (response.data.length > 0) {
          console.log("User login attempt: ", response.data);
          SetSessionData(response.data[0]);
          window.location.reload();
        } else {
          console.log("login failed.");
        }
        setIsLoading(false);
      });
  };

  const SetSessionData = (data) => {
    console.log("Session Data: ", data);
    localStorage.setItem("username", data.username);
    localStorage.setItem("firstname", data.firstname);
    localStorage.setItem("lastname", data.lastname);
    localStorage.setItem("email", data.email);
    localStorage.setItem("accountID", data.accountID);
  };

  //Register User
  //check if username/email already exists on datachange

  //Login User

  const SaveToCookie = async (response) => {
    let decoded = jwt_decode(response.credential);
    //store as cookie
    Cookies.set("loginCookie", JSON.stringify(decoded));
    //save to database.
    await SubmitUserDetails(decoded);
    window.location.reload();
  };

  const GetLoginCookie = () => {
    const loginCookie = Cookies.get("loginCookie");
    if (loginCookie) {
      const myObject = JSON.parse(loginCookie);
      console.log(myObject); // Output: { foo: 'bar', baz: 'qux' }
      return loginCookie;
    }
    return null;
  };

  const responseMessage = (response) => {
    console.log(response);
    setUser(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

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
          onClick={() => LoginDemoUser()}
          className="btn btn-outline-success w-100 mt-3"
        >
          Demo Login - no need to fill in the form.
        </button>
        <div className="d-flex justify-content-center mt-2">
          {GetLoginCookie() !== null ? (
            <button className="btn btn-danger w-100">Logout</button>
          ) : (
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                SaveToCookie(credentialResponse);
              }}
              onError={() => {
                console.log("login failed!");
              }}
            />
          )}
        </div>
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
          onClick={() => SubmitUserDetails()}
          className="btn btn-outline-success w-100 mt-3"
        >
          Register
        </button>
      </form>
    );
  };

  const CheckUserExists = () => {
    let loggedIn = false;
    if (Cookies.get("loginCookie") !== null) {
      loggedIn = true;
    }
    return loggedIn;
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const GetUsername = () => {
    let username = "";
    if (
      Cookies.get("loginCookie") !== null &&
      Cookies.get("loginCookie") !== undefined
    ) {
      console.log(JSON.parse(Cookies.get("loginCookie")));
      username = JSON.parse(Cookies.get("loginCookie")).given_name;
    }
    return username;
  };

  return (
    <div>
      {isLoading && <Loading />}
      <div className="text-center">
        <div className="display-2">Welcome {GetUsername()}</div>
      </div>

      <div className="container lg:w-50 mt-3 maxheight flex my-auto">
        {GetLoginCookie() === null
          ? loginOption
            ? LoginForm()
            : RegisterForm()
          : LogoutForm()}
      </div>
    </div>
  );
}

export default Login;
