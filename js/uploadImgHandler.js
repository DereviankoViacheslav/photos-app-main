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

function hashTagValidation(hashTag) {
  const errors = [];
  const validationRegExp = /#[0-9A-Za-z]+$/g;
  if (!validationRegExp.test(hashTag)) {
    errors.push(`Хэштег должен начинаться с "#",
        содержать только буквы и цифры,
        минимум один символ`);
  }
  const MAX_HASH_TAG_LENGTH = 20;
  if (hashTag.length > MAX_HASH_TAG_LENGTH) {
    errors.push('Максимальная длина хэштега 20 символов, включая "#"');
  }

  return errors.length ? errors : null;
}

function hashTagListValidation(hashTagList) {
  const errors = [];
  if (hashTagList.length > 5) {
    errors.push("Максимум 5 хэштегов");
    return errors;
  }
  for (let i = 0; i < hashTagList.length; i++) {
    const result = hashTagValidation(hashTagList[i]);
    if (result) {
      errors.push(...result);
      return errors;
    }
  }
  const duplicate = hashTagList
    .map((hashTag) => hashTag.toLowerCase())
    .find(
      (hashTag, index, hashTagList) => hashTagList.indexOf(hashTag) !== index
    );

  if (duplicate) {
    errors.push(`Хэштеги не должны повторяться
        Регистр не имеет значения.`);
    return errors;
  }
  return null;
}

function inputHashtagsHandler(event) {
  event.currentTarget.setCustomValidity("");
  event.target.style.outlineColor = "initial";
}

async function submitForm(event) {
  event.preventDefault();

  const formData = new FormData(uploadSelectImageForm);
  const hashTagsStr = formData.get("hashtagsInput");

  if (hashTagsStr) {
    const hashTagList = hashTagsStr.split(/\s/);
    const errors = hashTagListValidation(hashTagList);
    if (errors) {
      hashtagsInput.setCustomValidity(errors[0]);
      hashtagsInput.style.outlineColor = "red";
      event.currentTarget.reportValidity();
      return;
    }
  }
  event.currentTarget.reset();
  closeModal(editImgElement);
  //   console.log("formData = ", formData);
  //   console.log(
  //     "formData.get(uploadFileInput) = ",
  //     formData.get("uploadFileInput")
  //   );
  //   console.log(
  //     "formData.get(scaleControlInput) = ",
  //     formData.get("scaleControlInput")
  //   );
  //   console.log("formData.get(effect) = ", formData.get("effect"));
  //   console.log("formData.get(hashtagsInput) = ", formData.get("hashtagsInput"));
  //   console.log(
  //     "formData.get(descriptionTextarea) = ",
  //     formData.get("descriptionTextarea")
  //   );

  //   const response = await fetch("", {
  //     method: "POST",
  //     body: formData,
  //   });

  //   const result = await response.json();
}

uploadSelectImageForm.addEventListener("submit", submitForm);

hashtagsInput.addEventListener("input", inputHashtagsHandler);
hashtagsInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.stopPropagation();
  }
});
descriptionTextarea.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.stopPropagation();
  }
});

function cancel() {
  closeModal(editImgElement);
  uploadFileInput.value = "";
}

uploadCancelButton.addEventListener("click", cancel);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    cancel;
  }
});

uploadFileInput.addEventListener("change", (event) => {
  showModal(editImgElement);
});
