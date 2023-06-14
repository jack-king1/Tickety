import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.REACT_APP_SERVER_URL ||
    "https://ticketyapp-server-new.azurewebsites.net/",
});

export const GetTicketBuildList = async () => {
  await api
    .get("build/get")
    .then((response) => {
      console.log("Product: ", response);
    })
    .then(() => {
      return "Success!";
    });
};

export const SubmitTicketData = async (
  buildDesign,
  buildData,
  buildDataName,
  buildDataDescription,
  accountID
) => {
  //do date checks here.
  await api
    .post("build/submit", {
      buildDesign: buildDesign,
      buildData: buildData,
      buildDataName: buildDataName,
      buildDataDescription: buildDataDescription,
      accountID: accountID,
    })
    .then((response) => {
      console.log("Register Success!", response);
    });
};
