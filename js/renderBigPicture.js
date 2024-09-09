function createCloneCommentElement(avatarSrc, authorName, message) {
  const cloneSocialCommentTemplateContent = document
    .querySelector("template#social__comment")
    .content.cloneNode(true);

  const avatar =
    cloneSocialCommentTemplateContent.querySelector(".social__picture");
  avatar.src = avatarSrc;

  const author =
    cloneSocialCommentTemplateContent.querySelector(".social__author");
  author.textContent = authorName;

  const commentText =
    cloneSocialCommentTemplateContent.querySelector(".social__text");
  commentText.textContent = message;

  return cloneSocialCommentTemplateContent;
}

function createCommentElementList(comments) {
  return comments.map(({ avatar, name, message }) =>
    createCloneCommentElement(avatar, name, message)
  );
}

function closeModal(event, modal) {
  document.body.classList.remove("modal-open");
  modal.classList.add("hidden");
}

export function renderBigPicture(picture) {
  document.body.classList.add("modal-open");

  const bigPictureContainer = document.querySelector(".big-picture");
  bigPictureContainer.classList.remove("hidden");

  const bigPictureImg = bigPictureContainer.querySelector(
    ".big-picture__img > img"
  );
  bigPictureImg.src = picture.url;

  const socialCaption = bigPictureContainer.querySelector(".social__caption");
  socialCaption.textContent = picture.decription;

  const likesCount = bigPictureContainer.querySelector(".likes-count");
  likesCount.textContent = picture.likes;

  const commentsCount = bigPictureContainer.querySelector(".comments-count");
  commentsCount.textContent = picture.comments.length;

  const commentElementList = createCommentElementList(picture.comments);
  const socialComments = bigPictureContainer.querySelector(".social__comments");
  socialComments.replaceChildren(...commentElementList);

  const buttonPictureCancel =
    bigPictureContainer.querySelector("#picture-cancel");

  buttonPictureCancel.addEventListener("click", (event) =>
    closeModal(event, bigPictureContainer)
  );

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal(event, bigPictureContainer);
  });
}
