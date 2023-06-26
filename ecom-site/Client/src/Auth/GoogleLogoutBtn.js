import React from "react";
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google";

function GoogleLogoutBtn() {
  const onSuccess = (res) => {
    console.log("Logout Success!");
  };

  return (
    <div id="signOutButton">
      <googleLogout
        buttonText={"Logout"}
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default GoogleLogoutBtn;
