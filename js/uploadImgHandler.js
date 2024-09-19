import { showModal, closeModal } from "./renderBigPicture.js";

const uploadSelectImageForm = document.forms.uploadImageForm;

const editImgElement = uploadSelectImageForm.querySelector(
  ".img-upload__overlay"
);

const {
  uploadFileInput,
  uploadCancelButton,
  scaleControlInput,
  scaleControlSmallerButton,
  scaleControlBiggerButton,
  effect: effectRadioList,
  hashtagsInput,
  descriptionTextarea,
} = uploadSelectImageForm;

const imgUploadPreview = editImgElement.querySelector(".img-upload__preview");

scaleControlSmallerButton.addEventListener("click", function handler(event) {
  const currentValue = Number.parseInt(scaleControlInput.value);
  const newValue = currentValue > 25 ? currentValue - 25 : currentValue;
  scaleControlInput.value = `${newValue}%`;
  imgUploadPreview.style.transform = `scale(${newValue / 100})`;
});

scaleControlBiggerButton.addEventListener("click", function handler(event) {
  const currentValue = Number.parseInt(scaleControlInput.value);
  const newValue = currentValue < 100 ? currentValue + 25 : currentValue;
  scaleControlInput.value = `${newValue}%`;
  imgUploadPreview.style.transform = `scale(${newValue / 100})`;
});

function changeEffectHandler(event) {
  const { type, name, value } = event.target;
  if (type !== "radio" && name !== "effect") {
    return;
  }
  const effectClassName = [...imgUploadPreview.classList].find((className) =>
    className.includes("effects__preview--")
  );
  if (!effectClassName) {
    imgUploadPreview.classList.add(`effects__preview--${value}`);
    return;
  }
  imgUploadPreview.classList.replace(
    effectClassName,
    `effects__preview--${value}`
  );
}

uploadSelectImageForm.addEventListener("change", changeEffectHandler);

function changeHashtagsHandler(event) {
  const hashtagList = event.target.value
    .split("#")
    .filter((hashTag) => hashTag.trim().length > 0)
    .map((hashTag) => "#" + hashTag.replace(/\W|_/g, ""));

  event.target.value = hashtagList.join(" ");
}

hashtagsInput.addEventListener("change", changeHashtagsHandler);
hashtagsInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.stopPropagation();
  }
});

function clickCancelHandler(event) {
  closeModal(editImgElement);
  document.removeEventListener("keydown", keyCancelHandler);
  this.removeEventListener("click", clickCancelHandler);
  event.target.value = "";
}

function keyCancelHandler(event) {
  if (event.key === "Escape") {
    closeModal(editImgElement);
    this.removeEventListener("keydown", keyCancelHandler);
    uploadCancelButton.removeEventListener("click", clickCancelHandler);
    event.target.value = "";
  }
}

uploadFileInput.addEventListener("change", (event) => {
  showModal(editImgElement);
  uploadCancelButton.addEventListener("click", clickCancelHandler);
  document.addEventListener("keydown", keyCancelHandler);
});
