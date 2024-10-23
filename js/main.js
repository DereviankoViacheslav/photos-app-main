import { addPictureListOnPage } from "./renderPreviewPictureList.js";
import "./uploadImgHandler.js";

const SERVER_URL = "http://localhost:3000";

async function fetchData(url) {
  const response = await fetch(url);
  const result = await response.json();
  addPictureListOnPage(result.data);
}

fetchData(SERVER_URL);
