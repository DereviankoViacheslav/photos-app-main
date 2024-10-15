const LIMIT_COMMENTS_PER_PAGE = 5;

const fullImgModal = document.querySelector(".big-picture");
const commentsShown = fullImgModal.querySelector(".comments-shown");
const commentsCount = fullImgModal.querySelector(".comments-count");
const socialCaption = fullImgModal.querySelector(".social__caption");
const socialComments = fullImgModal.querySelector(".social__comments");
const likesCount = fullImgModal.querySelector(".likes-count");
const pictureCancelButton = fullImgModal.querySelector("#picture-cancel");
const bigPictureImg = fullImgModal.querySelector(".big-picture__img > img");
const commentsLoaderButton = fullImgModal.querySelector(".comments-loader");

document.addEventListener("keydown", closeFullImgModalHandler);
pictureCancelButton.addEventListener("click", closeFullImgModalHandler);

function closeFullImgModalHandler(event) {
  if (event.key === "Escape" || event.type === "click") {
    closeModal(fullImgModal);
  }
}

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

function paginate(array, itemPerPage, page) {
  const firstIndex = itemPerPage * page - itemPerPage;
  const lastIndex = firstIndex + itemPerPage;
  return array.slice(firstIndex, lastIndex);
}

function renderComments(comments) {
  const totalCountComments = comments.length;
  let commentsOnPage = totalCountComments;
  let currentPage = 1;

  if (totalCountComments > LIMIT_COMMENTS_PER_PAGE) {
    commentsOnPage = LIMIT_COMMENTS_PER_PAGE;
    commentsLoaderButton.classList.remove("hidden");
  }

  let currentComments = paginate(
    comments,
    LIMIT_COMMENTS_PER_PAGE,
    currentPage
  );
  let commentElementList = createCommentElementList(currentComments);

  commentsShown.textContent = commentsOnPage;
  commentsCount.textContent = totalCountComments;
  socialComments.replaceChildren(...commentElementList);

  function loadCommentsHandler() {
    ++currentPage;
    currentComments = paginate(comments, LIMIT_COMMENTS_PER_PAGE, currentPage);
    commentsOnPage += currentComments.length;
    commentElementList = createCommentElementList(currentComments);
    socialComments.append(...commentElementList);
    commentsShown.textContent = commentsOnPage;

    if (commentsOnPage === totalCountComments) {
      this.classList.add("hidden");
    }
  }

  commentsLoaderButton.onclick = loadCommentsHandler;
}

export function renderBigPicture(picture) {
  const { comments } = picture;
  showModal(fullImgModal);
  renderComments(comments);
  bigPictureImg.src = picture.url;
  socialCaption.textContent = picture.decription;
  likesCount.textContent = picture.likes;
}
