import { showModal, closeModal } from "./renderBigPicture.js";

const uploadSelectImageForm = document.querySelector(
  "form#upload-select-image"
);
const editImgElement = uploadSelectImageForm.querySelector(
  ".img-upload__overlay"
);
const uploadCancelButton = uploadSelectImageForm.querySelector(
  "button#upload-cancel"
);

function clickHandler(event) {
  closeModal(editImgElement);
  document.removeEventListener("keydown", escapeHandler);
  this.removeEventListener("click", clickHandler);
  event.target.value = "";
}

function escapeHandler(event) {
  if (event.key === "Escape") {
    closeModal(editImgElement);
    this.removeEventListener("keydown", escapeHandler);
    uploadCancelButton.removeEventListener("click", clickHandler);
    event.target.value = "";
  }
}

const uploadFileInput =
  uploadSelectImageForm.querySelector("input#upload-file");

uploadFileInput.addEventListener("change", (event) => {
  showModal(editImgElement);
  uploadCancelButton.addEventListener("click", clickHandler);
  document.addEventListener("keydown", escapeHandler);
});

const scaleControlInput = uploadSelectImageForm.querySelector(
  "input.scale__control--value"
);

const imgUploadPreview = editImgElement.querySelector(".img-upload__preview");

const scaleControlSmallerButton = uploadSelectImageForm.querySelector(
  "button.scale__control--smaller"
);
scaleControlSmallerButton.addEventListener("click", function handler(event) {
  const currentValue = Number.parseInt(scaleControlInput.value);
  const newValue = currentValue > 25 ? currentValue - 25 : currentValue;
  scaleControlInput.value = `${newValue}%`;
  imgUploadPreview.style.transform = `scale(${newValue / 100})`;
});

const scaleControlBiggerButton = uploadSelectImageForm.querySelector(
  "button.scale__control--bigger"
);
scaleControlBiggerButton.addEventListener("click", function handler(event) {
  const currentValue = Number.parseInt(scaleControlInput.value);
  const newValue = currentValue < 100 ? currentValue + 25 : currentValue;
  scaleControlInput.value = `${newValue}%`;
  imgUploadPreview.style.transform = `scale(${newValue / 100})`;
});
