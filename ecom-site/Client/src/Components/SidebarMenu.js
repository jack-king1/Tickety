import React, { useState, useEffect, useRef } from "react";
import "../CSS/BuildCanvas.css";
import "material-icons/iconfont/material-icons.css";
import {
  SubmitTicketData,
  api,
  DeleteTicketData,
  GetSelectedTicketBuild,
} from "./API";

function SidebarMenu({
  buildList,
  setBuildList,
  buildOptionObject,
  activeBuildOption,
  setActiveBuildOption,
}) {
  function activateInput(index, type) {
    console.log("focusing: ", type + index);
    const inputElement = document.getElementById(`${type}${index}`);
    inputElement.focus();
  }
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count * -1); // Triggers a re-render
  };

  const HandleBuildOptionChangesTitle = (index, value) => {
    let tempValues = buildList;
    tempValues[index].buildDataName = value;
    setBuildList(tempValues);
    incrementCount();
    console.log("Build List: ", tempValues);
  };

  const HandleBuildOptionChangesDesc = (index, value) => {
    let tempValues = buildList;
    tempValues[index].buildDataDescription = value;
    setBuildList(tempValues);
    incrementCount();
  };

  const RenderBuildListOptions = () => {
    let buildElements = [];
    if (buildList.length > 0) {
      buildList.forEach((buildItem, key) => {
        buildElements.push(
          <div
            key={key}
            className="d-flex border border-2 outline outline-black mb-2"
          >
            <div className="w-100 p-2 ticketbuilditem">
              <div
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
                className="buildtitle d-flex"
              >
                <input
                  id={`title${key}`}
                  className="border-0 w-100"
                  value={buildList[key].buildDataName}
                  onChange={(e) =>
                    HandleBuildOptionChangesTitle(key, e.target.value)
                  }
                ></input>
                <span
                  onClick={() => activateInput(key, "title")}
                  className="material-icons ms-2 editpen my-auto"
                >
                  edit
                </span>
              </div>
              <div className="d-flex">
                <input
                  id={`desc${key}`}
                  className="border-0 w-100"
                  value={buildList[key].buildDataDescription}
                  onChange={(e) =>
                    HandleBuildOptionChangesDesc(key, e.target.value)
                  }
                ></input>
                <span
                  onClick={() => activateInput(key, "desc")}
                  className="material-icons ms-2 editpen my-auto"
                >
                  edit
                </span>
              </div>
              <div>10 Ticket(s)</div>
              <button
                onClick={() =>
                  GetSelectedTicketBuild(
                    buildList[key].buildDataID,
                    setActiveBuildOption
                  )
                }
                className="btn btn-success w-100"
              >
                Open
              </button>
            </div>
            <div
              className="btn btn-sm btn-danger d-flex"
              onClick={() => DeleteBuildOption(key)}
            >
              <span className="material-icons text-white my-auto">delete</span>
            </div>
          </div>
        );
      });
    }
    return buildElements;
  };

  const DeleteBuildOption = (index) => {
    // Filter out the item to remove
    console.log("trying to remove: ", buildList[index]);
    let newArray = buildList.filter((item) => item !== buildList[index]);
    //remove from server database also
    DeleteTicketData(buildList[index].buildDataID);
    // Update the state with the modified array
    setBuildList(newArray);
    incrementCount();
  };

  const AddBuildOption = () => {
    let tempBuildItem = buildOptionObject;
    if (buildList.length > 0) {
      setBuildList((buildList) => [...buildList, tempBuildItem]);
    } else {
      setBuildList([tempBuildItem]);
    }
    console.log("Adding New Item!", buildList.length);
    //save to database --
    //canvas obj
    //data
    //name
    //desc
    //account id
    SubmitTicketData(
      null,
      null,
      tempBuildItem.buildName,
      tempBuildItem.buildDesc,
      localStorage.getItem("accountID")
    );
  };

  return (
    <div>
      <div className="position-fixed top-50 start-0 translate-middle-y">
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
