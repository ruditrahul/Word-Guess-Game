const letterDiv = document.querySelector(".letter-div");
const hintButton = document.querySelector(".hint-btn");
const resetButton = document.querySelector(".reset-btn");
const hintDiv = document.querySelector(".hint-div");
const hintText = document.querySelector(".hint-txt");
const liveSpan = document.querySelector(".lives");
const wordDiv = document.querySelector(".word-div");
const notif = document.querySelector(".notif");
const notifContent = document.querySelector(".notif-content");
const wrongAlert = document.querySelector(".wrong-alert");
const playAgain = document.querySelector(".notif-btn");
// let letters = document.querySelectorAll(".btn-letter");

// keeping letters using javascript
// so untill we put html content into letter-div,
// we cant capture letters
let letters;

let lives;

const words = new Map([
  ["time", "a test word"],
  ["pen", "another test word"],
  ["elephant", "some random word"],
  ["car", "some random word"],
  ["youth", "some random word"],
  ["mathematics", "some random word"],
]);

// making a list of only keys from words
const word_list = [...words.keys()];

// get random word from word_list function
const getRandomWord = function (list) {
  return list[Math.floor(Math.random() * word_list.length)];
};

// random word will be selected upon every reset and init
let select_word;

const init = function (state) {
  wordDiv.innerHTML = "";
  if (state === "start") {
  } else if (state === "reset") {
    letters.forEach((btn) => {
      btn.classList.remove("disabled");
    });
  }
  select_word = getRandomWord(word_list);
  lives = 7;

  wrongAlert.classList.add("hidden");

  // capturing letters div
  letters = document.querySelectorAll(".btn-letter");
  liveSpan.textContent = lives;

  // putting selected word
  for (let i = 0; i < select_word.length; i++) {
    const html = `<p class="word">_</p>`;
    wordDiv.insertAdjacentHTML("beforeend", html);
  }
};
// initializing the page
init("start");

// decrease life
const decreaseLife = function () {
  lives--;
  //   console.log(lives);
  liveSpan.textContent = lives;
  if (lives === 0) {
    letters.forEach((btn) => {
      btn.classList.add("disabled");
    });
    alert("YOU LOSE!");
  }
};

// get multiple matching indexes of pressed letter
// to the selected word
const getindexes = function (letter) {
  let indexes = [];
  [...select_word].forEach((val, i) => {
    if (val === letter) {
      const index = i;
      indexes.push(index);
    }
  });
  //   console.log(indexes);
  return indexes;
};

// check if we get complete word
const checkWord = function () {
  let val = true;
  for (let i = 0; i < wordDiv.children.length; i++) {
    if (wordDiv.children[i].textContent === "_") {
      val = false;
    }
  }
  return val;
};

// letters event listener function
const letterPress = function () {
  const letter = this.textContent.toLowerCase();

  if (select_word.includes(letter)) {
    wrongAlert.classList.add("hidden");
    const indexes_list = getindexes(letter);
    indexes_list.forEach((val, i) => {
      wordDiv.children[val].textContent = this.textContent;
    });
    if (checkWord()) {
      indexes_list.forEach((val, i) => {
        wordDiv.children[val].textContent = this.textContent;
      });
      letters.forEach((btn) => {
        btn.classList.add("disabled");
      });
      alert("YOU WON!");
    }
  } else {
    wrongAlert.classList.remove("hidden");
    decreaseLife();
  }
  this.classList.add("disabled");
};

// listening to letter buttons presses
letters.forEach((btn) => {
  btn.addEventListener("click", letterPress);
});

// listening to reset btn
resetButton.addEventListener("click", function () {
  init("reset");
});
