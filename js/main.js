import { addPictureListOnPage } from "./renderPreviewPictureList.js";
import * as test from "./uploadImgHandler.js";

const PICTURE_COUNT = 28;
const AVATARS_COUNT = 6;
const MAX_COMMENTS_COUNT = 20;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const pictureList = Array(PICTURE_COUNT);

function getRandomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createComment(id) {
  const names = [
    "Аня",
    "Коля",
    "Петя",
    "Вася",
    "Артём",
    "Витя",
    "Женя",
    "Гена",
  ];
  const name = names[getRandomIntFromInterval(0, names.length - 1)];
  const messages = [
    "Все отлично!",
    "В общем все неплохо. Но не все.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов, это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у нее получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица людей на фотке перекошены, будто их избивают. Как можно было поймать такой неудачный момент?",
  ];
  const message = messages[getRandomIntFromInterval(0, messages.length - 1)];

  return {
    id,
    name,
    avatar: `img/avatar-${getRandomIntFromInterval(1, AVATARS_COUNT)}.svg`,
    message,
  };
}

let commentIds = 0;
for (let i = 0; i < pictureList.length; i++) {
  const comments = Array(getRandomIntFromInterval(2, MAX_COMMENTS_COUNT));

  for (let j = 0; j < comments.length; j++) {
    comments[j] = createComment(commentIds++);
  }

  pictureList[i] = {
    id: i + 1,
    url: `photos/${i + 1}.jpg`,
    decription: `some random decription ${i + 1}`,
    likes: getRandomIntFromInterval(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments,
  };
}

addPictureListOnPage(pictureList);
