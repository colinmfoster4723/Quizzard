"use strict";
////DOM//////
const mod = document.querySelector(".three");
const question = document.querySelector(".question");
const randomBtn = document.querySelector(".btn--random");
const answer = document.querySelector(".answer");
const submitBtn = document.querySelector(".btn--submit");
const img = document.querySelector(".img");
let shaderVar;
//variables&&values///
let quiz = {
    randomize (arr) {
        let q = quiz[arr];
        for(let i = q.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            let temp = q[i];
            q[i] = q[j];
            q[j] = temp;
        }
    }
};
const correctImg = "correct.jpg";
const incorrectImg = "incorrect.jpg";
let curQuiz;
let curQuestion;
let score;
let incorrect;
let quizBook;
/////FUNCTIONS///////
function setLocalStorage(quiz1) {
    localStorage.setItem("quizzes", JSON.stringify(quiz1));
}
function getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("quizzes"));
    if (!data) return;
    quiz = data;
}
function refreshQuizBook() {
    quizBook = `Select Quiz: \n \n ${Object.keys(quiz).filter((key)=>key != "randomize").join(", ")}`;
}
function clearBox() {
    answer.value = "";
    question.style.background = answer.style.background = "transparent";
    img.innerHTML = "";
    shaderVar = 0.5;
}
function clear() {
    question.textContent = "";
    answer.value = "";
}
function reset() {
    clear();
    curQuiz = "none";
    refreshQuizBook();
    question.textContent = quizBook;
    if (typeof incorrect === "number") question.textContent = quizBook + `\n \n # of incorrect answers : ${incorrect}`;
}
function nextQuestion() {
    if (score === curQuiz.length) {
        reset();
        return;
    }
    answer.value = "Correct";
    question.style.background = answer.style.background = "limegreen";
    img.insertAdjacentHTML("afterbegin", `<img src=${correctImg}>`);
    shaderVar = 0.0;
    setTimeout(()=>{
        clearBox();
        question.textContent = curQuiz[score][0];
    }, 1500);
}
function checkAnswer(input) {
    if (!input || curQuiz === "none") return;
    let currentAnswer = curQuiz[score][1];
    if (input === currentAnswer) {
        score++;
        nextQuestion();
    } else {
        answer.value = "Incorrect";
        question.style.background = answer.style.background = "coral";
        shaderVar = 1.0;
        incorrect++;
        setTimeout(()=>clearBox(), 750);
        return;
    }
}
function startQuiz(q) {
    curQuiz = quiz[q];
    clear();
    incorrect = score = 0;
    curQuestion = curQuiz[0][0];
    question.textContent = curQuestion;
}
function menuToggle() {
    if (curQuiz === "none" && Object.keys(quiz).includes(answer.value)) startQuiz(answer.value);
    else checkAnswer(answer.value);
}
getLocalStorage();
reset();
///EVENT LISTENERS//////
submitBtn.addEventListener("click", menuToggle);
answer.addEventListener("click", clearBox);
randomBtn.addEventListener("click", function() {
    if (curQuiz === "none" && Object.keys(quiz).includes(answer.value)) quiz.randomize(answer.value);
});
answer.addEventListener("keydown", function(e) {
    if (e.key === "Enter") menuToggle();
});
////////////////////////////////////////////////////////////////////////////////////////////
///CREATE NEW QUIZ MODAL//////
/////////////////////////////////////////
const createQuiz = document.querySelector(".quiz-create");
const modal = document.querySelector(".quiz");
const overlay = document.querySelector(".overlay");
const quizQuestion = document.querySelector(".quiz-question");
const quizAnswer = document.querySelector(".quiz-answer");
const addTo = document.querySelector(".add-to-quiz");
const completeQuiz = document.querySelector(".complete-quiz");
const limbo = document.querySelector(".feed");
let inProcess;
let n;
/////FUNCTIONS/////////
function resetCreate() {
    //use on exit//
    quizAnswer.value = quizQuestion.value = limbo.innerHTML = "";
    overlay.style.display = modal.style.display = "none";
}
function create() {
    modal.style.display = "flex";
    overlay.classList.remove("hidden");
    n = prompt("Give Your Quiz a Name !!!");
    if (!n) {
        resetCreate();
        return;
    }
    limbo.insertAdjacentHTML("beforeend", `<p class='limbo-name'>NAME : ${n} <br><br></p>`);
    quiz[n] = [];
}
function add() {
    let question1 = quizQuestion.value;
    let answer1 = quizAnswer.value;
    inProcess = quiz[n];
    let html = `<p class='limbo-question'>QUESTION: ${inProcess.length + 1} <br> </p><p class='limbo-data'>${question1}</p><p class='limbo-data'> ANSWER: ${answer1}<br><br></p><div class=line></div>`;
    if (question1 === "" || question1 === "number") return;
    inProcess.push([
        question1,
        answer1
    ]);
    quizQuestion.value = quizAnswer.value = "";
    limbo.insertAdjacentHTML("beforeend", html);
}
function complete() {
    if (inProcess.length <= 0) return;
    setLocalStorage(quiz);
    resetCreate();
    reset();
}
//////Event Listeners//////////
createQuiz.addEventListener("click", create);
addTo.addEventListener("click", add);
completeQuiz.addEventListener("click", complete);

//# sourceMappingURL=index.672d4772.js.map
