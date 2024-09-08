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

function createClonePostElement(url, likes, comments) {
  const clonePictureTemplateContent = document
    .querySelector("template#picture")
    .content.cloneNode(true);

  const picture = clonePictureTemplateContent.querySelector(".picture__img");
  picture.src = url;

  const pictureLikes =
    clonePictureTemplateContent.querySelector(".picture__likes");
  pictureLikes.textContent = likes;

  const commentElementList = createCommentElementList(comments);

  const pictureComments =
    clonePictureTemplateContent.querySelector(".picture__comments");
  pictureComments.append(...commentElementList);

  return clonePictureTemplateContent;
}

function createPostElementList(posts) {
  // decription,
  return posts.map(({ url, likes, comments }) =>
    createClonePostElement(url, likes, comments)
  );
}

export function addPostsOnPage(posts) {
  const postElementList = createPostElementList(posts);

  const pictures = document.querySelector(".pictures");
  pictures.append(...postElementList);
}
