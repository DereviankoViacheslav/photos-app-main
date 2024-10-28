import { addPictureListOnPage } from "./renderPreviewPictureList.js";
import { SERVER_URL } from "./constants.js";
import "./uploadImgHandler.js";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    addPictureListOnPage(result.data);
  } catch (error) {
    console.log("Error: ", error.message);
    addPictureListOnPage([]);
  }
}

fetchData(SERVER_URL);
