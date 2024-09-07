const postCount = 25;
const posts = Array(postCount);

function getRandomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createComment(id) {
  const names = ["Jon", "Bob", "Anna"];
  const name = names[getRandomIntFromInterval(0, names.length - 1)];
  const messages = ["OK", "Bad", "Normal"];
  const message = messages[getRandomIntFromInterval(0, messages.length - 1)];

  return {
    id,
    name,
    avatar: `img/avatar-${getRandomIntFromInterval(1, 6)}.svg`, // (1-6)
    message,
  };
}

let commentIds = 0;
for (let i = 0; i < posts.length; i++) {
  const comments = Array(getRandomIntFromInterval(3, 10));

  for (let j = 0; j < comments.length; j++) {
    comments[j] = createComment(commentIds++);
  }

  posts[i] = {
    id: i + 1,
    url: `photos/${i + 1}.jpg`,
    decription: `some random decription ${i + 1}`,
    likes: getRandomIntFromInterval(15, 200), // (15-200)
    comments,
  };
}
