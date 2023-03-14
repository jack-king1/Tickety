import React from "react";
import "material-icons/iconfont/material-icons.css";

function Login() {
  return (
    <div>
      <div className="container w-50">
        <div className="p-2 mt-4 bg-primary d-flex justify-content-center ">
          <span className="align-self-center material-icons-round text-white me-2 text-lg fs-2">
            person
          </span>
          <h3 className=" text-white rounded text-center">
            Please Register/Login
          </h3>
        </div>

        <form>
          <div className="form-group">
            <div className="d-flex">
              <div className="me-4 w-50">
                <label>First Name</label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="First name"
                />
              </div>
              <div className="w-50">
                <label>Last Name</label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Last name"
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
            />
          </div>
          <button type="submit" className="btn btn-success w-100 mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
