import { showModal, closeModal } from "./renderBigPicture.js";
import { SERVER_URL } from "./constants.js";

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
  effectLevelInput,
} = uploadSelectImageForm;

const imgUploadPreview = editImgElement.querySelector(".img-upload__preview");
const slider = editImgElement.querySelector("#slider");

noUiSlider.create(slider, {
  start: 0,
  step: 0.1,
  connect: "lower",
  range: {
    min: 0,
    max: 1,
  },
});

slider.noUiSlider.disable();

slider.noUiSlider.on("update", function (values, handle) {
  const effectLevel = values[handle];
  let effect = effectRadioList.value;
  const effects = {
    chrome: `grayscale(${effectLevel})`,
    sepia: `sepia(${effectLevel})`,
    marvin: `invert(${effectLevel}%)`,
    phobos: `blur(${effectLevel}px)`,
    heat: `brightness(${effectLevel})`,
  };
  imgUploadPreview.style.WebkitFilter = effects[effect];
  imgUploadPreview.style.filter = effects[effect];
  effectLevelInput.value = effectLevel;
});

scaleControlSmallerButton.addEventListener("click", function handler(event) {
  const currentValue = Number.parseInt(scaleControlInput.value);
  const SCALE_STEP = 25;
  const newValue =
    currentValue > SCALE_STEP ? currentValue - SCALE_STEP : currentValue;
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
  slider.noUiSlider.reset();
  const effectClassName = [...imgUploadPreview.classList].find((className) =>
    className.includes("effects__preview--")
  );
  if (!effectClassName) {
    imgUploadPreview.classList.add(`effects__preview--${value}`);
  } else {
    imgUploadPreview.classList.replace(
      effectClassName,
      `effects__preview--${value}`
    );
  }
  if (value === "none") {
    slider.noUiSlider.disable();
    return;
  }
  let start = 1;
  let step = 0.1;
  let min = 0;
  let max = 1;

  switch (value) {
    case "marvin":
      start = max = 100;
      step = 1;
      break;
    case "phobos":
    case "heat":
      start = max = 3;
      min = value === "heat" ? 1 : 0;
      break;
  }
  slider.noUiSlider.enable();
  slider.noUiSlider.updateOptions({ start, step, range: { min, max } });
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
  const data = {
    uploadFile: formData.get("uploadFileInput"),
    scaleControl: formData.get("scaleControlInput"),
    effectLevel: formData.get("effectLevelInput"),
    effect: formData.get("effect"),
    hashtags: formData.get("hashtagsInput"),
    description: formData.get("descriptionTextarea"),
  };
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    body: "",
    headers,
  };
  const reader = new FileReader();
  reader.onload = async () => {
    data.uploadFile = reader.result;
    requestOptions.body = JSON.stringify(data);
    const response = await fetch(SERVER_URL, requestOptions);
    console.log("response==>>", await response.json());
  };
  reader.readAsDataURL(data.uploadFile);

  cancel();
  event.currentTarget.reset();
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
  uploadSelectImageForm.reset();
  slider.noUiSlider.reset();
  slider.noUiSlider.disable();
  const effectClassName = [...imgUploadPreview.classList].find((className) =>
    className.includes("effects__preview--")
  );
  if (effectClassName) {
    imgUploadPreview.classList.replace(
      effectClassName,
      "effects__preview--none"
    );
  }
  imgUploadPreview.style.transform = "none";
  imgUploadPreview.style.WebkitFilter = "none";
  imgUploadPreview.style.filter = "none";
}

uploadCancelButton.addEventListener("click", cancel);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    cancel();
  }
});

uploadFileInput.addEventListener("change", () => {
  showModal(editImgElement);
});
