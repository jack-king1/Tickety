import axios from "axios";
import { Buffer } from "buffer";

export const api = axios.create({
  baseURL: "https://ticketyapp-server-new.azurewebsites.net/",
});

export const GetTicketBuildList = async (subID, setBuildList) => {
  let params = new URLSearchParams([["subID", subID]]);
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
  buildFontSizeStates,
  subID
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
      buildFontSizeStates: buildFontSizeStates,
      subID: subID,
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

export const UpdateTicketData = async (activeBuildData) => {
  //do date checks here.
  console.log("BUILD DATA: ", activeBuildData);
  await api
    .post("build/update", {
      buildDesign: JSON.stringify(activeBuildData.buildDesign),
      buildData: JSON.stringify(activeBuildData.buildData),
      buildDataName: activeBuildData.buildDataName,
      buildDataDescription: activeBuildData.buildDataDescription,
      buildFontStates: JSON.stringify(activeBuildData.buildFontStates),
      buildTextAlignStates: JSON.stringify(
        activeBuildData.buildTextAlignStates
      ),
      buildDataID: activeBuildData.buildDataID,
      buildFontSizeStates: JSON.stringify(activeBuildData.buildFontSizeStates),
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
    const fontSizeStates = JSON.parse(response.data[0].buildFontSizeStates);

    response.data[0].buildFontStates = fontStates;
    response.data[0].buildData = data;
    response.data[0].buildTextAlignStates = textAlignStates;
    response.data[0].buildFontSizeStates = fontSizeStates;

    console.log("LOGGING FINAL RESPONSE AFTER PARSE: ", response.data[0]);

    setActiveBuildOption(response.data[0]);
    localStorage.setItem("activeBuildOption", JSON.stringify(response.data[0]));
    return response;
  });
};
