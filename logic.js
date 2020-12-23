var currentQuestionIndex = 0;
var timerId;
// variable list
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var optionsEl = document.getElementById("options");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var answerCheckerEl = document.getElementById("answerchecker");

var questions = [

  {
    title: "How do you reference your JavaScript page in your html file?:",
    options: ["<script src=filenamehere></script>", "<link rel= href=filenamehere>", "You don't need to!", "./filenamehere"],
    answer: "<script src=filenamehere></script>"
  },

  {
    title: "How do you begin a for loop?",
    options: ["i=1-9", "(0<i<9)", "(i=0;i<9;i++)", "i++=i<9"],
    answer: "(i=0;i<9;i++)"
  },

  {
    title: "How do you create a comment in JavaScript?",
    options: ["//comment here", "<!--comment here-->", "|comment here|", " /comment here\ "],
    answer: "//comment here"
  },

  {
    title: "Does JavaScript depend on case sensitive language",
    options: ["Yes", "No", "Only on Tuesdays", "Definitely not"],
    answer: "Yes"
  },

  {
    title: "Which came first, JavaScript or Java?",
    options: ["Discovering water on Mars", "Java", "The chicken", "JavaScript"],
    answer: "Java"
  },

  {
    title: "Which HTML element is used to insert JavaScript?",
    options: ["<style>", "<main>", "<header>", "<script>"],
    answer: "<script>"
  },

]

var time = questions.length * 15;

function timeinterval() {
  // time refresh
  time--;
  timerEl.textContent = time;
  // determine if time has ran out
  if (time <= 0) {
    quizEnd();
  }
}

function startQuiz() {
  // hide home screen
  var homeScreenEl = document.getElementById("homescreen");
  homeScreenEl.setAttribute("class", "hide");
  // unhide choides
  questionsEl.removeAttribute("class");
  // start timer
  timerId = setInterval(timeinterval, 1000);
  // display start time in upper right corner
  timerEl.textContent = time;
  getQuestion();
}
function getQuestion() {
  // get current questions based on arrays
  var currentQuestion = questions[currentQuestionIndex];
  // update header with the current question
  var titleEl = document.getElementById("questiontitle");
  titleEl.textContent = currentQuestion.title;
  // delete any old options
  optionsEl.innerHTML = "";
  // loop options
  currentQuestion.options.forEach((option, i) => {
    // create each option as a button
    var optionNode = document.createElement("button");
    optionNode.setAttribute("class", "option");
    optionNode.setAttribute("value", option);
    optionNode.textContent = i + 1 + ". " + option;
    // create an event listener for each option
    optionNode.onclick = questionClick;
    // show on page
    optionsEl.appendChild(optionNode);
  });
}
function questionClick() {
  // determine if the wrong answer was chosen
  if (this.value !== questions[currentQuestionIndex].answer) {
    // time penalty
    time -= 7;
    if (time < 0) {
      time = 0;
    }
    // show updated time in top right corner
    timerEl.textContent = time;

    // if wrong answer is chosen
    answerCheckerEl.textContent = "Study Harder!";
  } else {

    // if right answer is chosen
    answerCheckerEl.textContent = "Keep it up!";
  }
  // show whether or not answer is right or wrong
  answerCheckerEl.setAttribute("class", "answerchecker");
  setTimeout(function () {
    answerCheckerEl.setAttribute("class", "answerchecker hide");
  }, 1200);
  // cycle to next question
  currentQuestionIndex++;
  // determine if questions have run out
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}
function quizEnd() {
  // stop time
  clearInterval(timerId);
  // display end screen
  var endScreenEl = document.getElementById("endscreen");
  endScreenEl.removeAttribute("class");
  // show your score
  var yourScoreEl = document.getElementById("yourscore");
  yourScoreEl.textContent = time;
  // hide questions
  questionsEl.setAttribute("class", "hide");
}

function highScore() {
  // obtain entered value for initials
  var initials = initialsEl.value.trim();
  // determine whether characters were entered
  if (initials !== "") {
    // show high scores from local
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    // create new score storage for new user
    var newScore = {
      score: time,
      initials: initials
    };
    // save highscores
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    
    window.location.href = "highscore.html";
  }
}

// this button submits high score characters
submitBtn.onclick = highScore;
// this button starts the quiz
startBtn.onclick = startQuiz;