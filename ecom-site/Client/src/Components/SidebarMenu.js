import React from "react";
import "../CSS/BuildCanvas.css";
import "material-icons/iconfont/material-icons.css";
import { SubmitTicketData } from "./API";

function SidebarMenu({ buildList, setBuildList, buildOptionObject }) {
  const RenderBuildListOptions = () => {
    let buildElements = [];
    if (buildList.length > 0) {
      buildList.forEach((buildItem) => {
        buildElements.push(<div>NEW ITEM HERE!!!!!</div>);
      });
    }
    console.log("BUILD List: ", buildList);
    return buildElements;
  };

  const AddBuildOption = () => {
    if (buildList.length > 0) {
      let tempBuildItem = buildOptionObject;
      setBuildList((buildList) => [...buildList, tempBuildItem]);
    } else {
      let tempBuildItem = buildOptionObject;
      setBuildList([tempBuildItem]);
    }
    console.log("Adding New Item!", buildList.length);
  };

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
            My Tickets
          </h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <p className="">
            View all your ticket designs here and select one to edit!
          </p>
          {RenderBuildListOptions()}
        </div>

        <button className="btn btn-success" onClick={() => AddBuildOption()}>
          Add +
        </button>
      </div>
    </div>
  );
}

export default SidebarMenu;
