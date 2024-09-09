import { pictureList } from "./main.js";
import { renderBigPicture } from "./renderBigPicture.js";

function openBigPictureModal(event, picture) {
  event.preventDefault();
  renderBigPicture(picture);
}

function createClonePictureElement(picture) {
  const clonePictureTemplateContent = document
    .querySelector("template#picture")
    .content.cloneNode(true);

  const pictureTemplate =
    clonePictureTemplateContent.querySelector(".picture__img");
  pictureTemplate.src = picture.url;

  const pictureLikes =
    clonePictureTemplateContent.querySelector(".picture__likes");
  pictureLikes.textContent = picture.likes;

  const pictureComments =
    clonePictureTemplateContent.querySelector(".picture__comments");
  pictureComments.textContent = picture.comments.length;

  const pictureElement = clonePictureTemplateContent.querySelector("a.picture");
  pictureElement.addEventListener("click", (event) =>
    openBigPictureModal(event, picture)
  );

  return clonePictureTemplateContent;
}

function createPictureElementList(pictureList) {
  return pictureList.map((picture) => createClonePictureElement(picture));
}

export function addPictureListOnPage(pictureList) {
  const pictureElementList = createPictureElementList(pictureList);

  const pictures = document.querySelector(".pictures");
  pictures.append(...pictureElementList);
}

addPictureListOnPage(pictureList);
