import { renderBigPicture } from "./renderBigPicture.js";

function createClonePictureElement(picture) {
  const clonePictureTemplateContent = document
    .querySelector("template#picture")
    .content.cloneNode(true);

  clonePictureTemplateContent.querySelector("a.picture").dataset.pictureId =
    picture.id;

  const pictureTemplate =
    clonePictureTemplateContent.querySelector(".picture__img");
  pictureTemplate.src = picture.url;

  const pictureLikes =
    clonePictureTemplateContent.querySelector(".picture__likes");
  pictureLikes.textContent = picture.likes;

  const pictureComments =
    clonePictureTemplateContent.querySelector(".picture__comments");
  pictureComments.textContent = picture.comments.length;

  return clonePictureTemplateContent;
}

function createPictureElementList(pictureList) {
  return pictureList.map((picture) => createClonePictureElement(picture));
}

export function addPictureListOnPage(pictureList) {
  const pictureElementList = createPictureElementList(pictureList);

  const pictures = document.querySelector(".pictures");
  pictures.addEventListener("click", (event) => {
    const target = event.target.closest("a.picture");
    if (!target) return;
    const picture = pictureList.find(
      (picture) => `${picture.id}` === target.dataset.pictureId
    );
    event.preventDefault();
    renderBigPicture(picture);
  });
  pictures.append(...pictureElementList);
}
