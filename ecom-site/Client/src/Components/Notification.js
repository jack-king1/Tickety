import React, { useState, useEffect } from "react";
import "../CSS/App.css";

function Notification(props) {
  const GetNotification = () => {
    return (
      <div
        className={`position-fixed top-0 start-0 w-100 h-5 bg-success sticky-top fade-div ${
          props.active ? "fade-in" : "fade-out"
        }`}
      >
        <div className="text-center text-white fw-bold">{props.text}</div>
      </div>
    );
  };

  return <div>{GetNotification()}</div>;
}

export default Notification;
