import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="136989610019-neeen7tqr6o45dk62t1om6vut9sburkm.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
