import axios from "axios";
import { Buffer } from "buffer";

export const api = axios.create({
  baseURL:
    process.env.REACT_APP_SERVER_URL ||
    "https://ticketyapp-server-new.azurewebsites.net/",
});

export const GetTicketBuildList = async (accountID, setBuildList) => {
  let params = new URLSearchParams([["accountID", accountID]]);
  await api.get("build/getpreviewdatalist", { params }).then((response) => {
    setBuildList(response.data);
    return response;
  });
};

export const SubmitTicketData = async (
  buildDesign,
  buildData,
  buildDataName,
  buildDataDescription,
  buildFontStates,
  buildTextAlignStates,
  accountID
) => {
  //do date checks here.
  await api
    .post("build/submit", {
      buildDesign: buildDesign,
      buildData: buildData,
      buildDataName: buildDataName,
      buildDataDescription: buildDataDescription,
      buildFontStates: buildFontStates,
      buildTextAlignStates: buildTextAlignStates,
      accountID: accountID,
    })
    .then((response) => {
      console.log("Register Success!", response);
    });
};

export const DeleteTicketData = async (buildDataID) => {
  //do date checks here.
  await api
    .post("build/delete", {
      buildDataID: buildDataID,
    })
    .then((response) => {
      console.log("Register Success!", response);
    });
};

export const UpdateTicketData = async (
  buildDesign,
  buildData,
  buildDataName,
  buildDataDescription,
  buildFontStates,
  buildTextAlignStates,
  buildDataID
) => {
  //do date checks here.
  await api
    .post("build/update", {
      buildDesign: buildDesign,
      buildData: buildData,
      buildDataName: buildDataName,
      buildDataDescription: buildDataDescription,
      buildFontStates: buildFontStates,
      buildTextAlignStates: buildTextAlignStates,
      buildDataID: buildDataID,
    })
    .then((response) => {
      console.log("Register Success!", response);
    });
};

export const GetSelectedTicketBuild = async (
  buildDataID,
  setActiveBuildOption
) => {
  let params = new URLSearchParams([["buildDataID", buildDataID]]);
  await api.get("build/getselected", { params }).then((response) => {
    const fontStates = JSON.parse(response.data[0].buildFontStates);
    const data = JSON.parse(response.data[0].buildData);
    const textAlignStates = JSON.parse(response.data[0].buildTextAlignStates);

    response.data[0].buildFontStates = fontStates;
    response.data[0].buildData = data;
    response.data[0].buildTextAlignStates = textAlignStates;

    console.log("LOGGING FINAL RESPONSE AFTER PARSE: ", response.data[0]);

    setActiveBuildOption(response.data[0]);
    localStorage.setItem("activeBuildOption", JSON.stringify(response.data[0]));
    return response;
  });
};
