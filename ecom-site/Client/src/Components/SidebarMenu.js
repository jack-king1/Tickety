import React from "react";
import "../CSS/BuildCanvas.css";
import "material-icons/iconfont/material-icons.css";

function SidebarMenu() {
  return (
    <div>
      <div className="position-absolute top-50 start-0 translate-middle-y">
        <button
          className="btn btn-primary taller-button d-flex"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          <span className="material-icons text-white">arrow_right</span>
        </button>
      </div>

      <div
        class="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
            Colored with scrolling
          </h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <p>
            Try scrolling the rest of the page to see this option in action.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SidebarMenu;
