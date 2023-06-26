import React from "react";
import { GoogleOAuthProvider, googleLogin } from "@react-oauth/google";

function GoogleLoginBtn() {
  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS - Current User: ", res.profileObj);
  };
  const onFailure = (res) => {
    console.log("LOGIN Failure - res: ", res);
  };
  return (
    <div id="signInButton">
      <googleLogin
        buttonText="Login"
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={onSuccess}
        onError={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default GoogleLoginBtn;
