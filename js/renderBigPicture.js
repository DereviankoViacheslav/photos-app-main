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

export function showModal(modal) {
  document.body.classList.add("modal-open");
  modal.classList.remove("hidden");
}

export function closeModal(modal) {
  document.body.classList.remove("modal-open");
  modal.classList.add("hidden");
}

export function renderBigPicture(picture) {
  const bigPictureContainer = document.querySelector(".big-picture");
  showModal(bigPictureContainer);

  const commentElementList = createCommentElementList(picture.comments);
  const socialComments = bigPictureContainer.querySelector(".social__comments");
  socialComments.replaceChildren(...commentElementList);
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
  const pictureCancelButton =
    bigPictureContainer.querySelector("#picture-cancel");

  function clickHandler() {
    closeModal(bigPictureContainer);
    document.removeEventListener("keydown", escapeHandler);
    this.removeEventListener("click", clickHandler);
  }

  function escapeHandler(event) {
    if (event.key === "Escape") {
      closeModal(bigPictureContainer);
      this.removeEventListener("keydown", escapeHandler);
      pictureCancelButton.removeEventListener("click", clickHandler);
    }
  }

  pictureCancelButton.addEventListener("click", clickHandler);
  document.addEventListener("keydown", escapeHandler);
}

// export function renderBigPicture(picture) {
//   const modal = document.querySelector(".big-picture");
//   showModal(modal);

//   modal
//     .querySelector(".social__comments")
//     .replaceChildren(...createCommentElementList(picture.comments));
//   modal.querySelector(".big-picture__img > img").src = picture.url;
//   modal.querySelector(".social__caption").textContent = picture.decription;
//   modal.querySelector(".likes-count").textContent = picture.likes;
//   modal.querySelector(".comments-count").textContent = picture.comments.length;
//   const pictureCancelButton = modal.querySelector("#picture-cancel");

//   function clickHandler() {
//     closeModal(modal);
//     document.removeEventListener("keydown", escapeHandler);
//     this.removeEventListener("click", clickHandler);
//   }

//   function escapeHandler(event) {
//     if (event.key === "Escape") {
//       closeModal(modal);
//       this.removeEventListener("keydown", escapeHandler);
//       pictureCancelButton.removeEventListener("click", clickHandler);
//     }
//   }

//   pictureCancelButton.addEventListener("click", clickHandler);
//   document.addEventListener("keydown", escapeHandler);
// }
