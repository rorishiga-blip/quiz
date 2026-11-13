


const questions = [

    {
        question: "Which keyword is used to create a class in Java?",
        choices: [
            "function",
            "class",
            "object",
            "new"
        ],
        answer: "class"
    },

    {
        question: "Which method is the starting point of a Java program?",
        choices: [
            "start()",
            "run()",
            "main()",
            "begin()"
        ],
        answer: "main()"
    },

    {
        question: "Which data type is used to store whole numbers in Java?",
        choices: [
            "String",
            "double",
            "boolean",
            "int"
        ],
        answer: "int"
    }

];



let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;



const landingPage = document.getElementById("landingPage");
const quizPage = document.getElementById("quizPage");
const resultPage = document.getElementById("resultPage");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("scoreDisplay");
const questionText = document.getElementById("question");
const choicesContainer = document.getElementById("choices");
const progressBar = document.getElementById("progressBar");
const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");
const themeToggle = document.getElementById("themeToggle");
const videoModal = document.getElementById("videoModal");
const quizVideo = document.getElementById("quizVideo");
const closeVideo = document.getElementById("closeVideo");



startBtn.addEventListener("click", function () {

    landingPage.classList.add("hidden");
    quizPage.classList.remove("hidden");

    currentQuestion = 0;
    score = 0;

    showQuestion();

});



function showQuestion() {

    selectedAnswer = null;
    nextBtn.disabled = true;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreDisplay.textContent =
        `Score: ${score}`;

    questionText.textContent = current.question;

    choicesContainer.innerHTML = "";

    /* Progress Bar */

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = progress + "%";


    current.choices.forEach(function (choice) {

        const button = document.createElement("button");

        button.classList.add("choice");
        button.textContent = choice;

        button.addEventListener("click", function () {
            selectAnswer(button, choice);
        });

        choicesContainer.appendChild(button);

    });

}


function selectAnswer(button, choice) {

    selectedAnswer = choice;

    const allChoices = document.querySelectorAll(".choice");

    allChoices.forEach(function (item) {
        item.classList.remove("selected");
    });

    button.classList.add("selected");

    nextBtn.disabled = false;

}



nextBtn.addEventListener("click", function () {

    if (selectedAnswer === null) {
        return;
    }

    const correctAnswer = questions[currentQuestion].answer;


    if (selectedAnswer === correctAnswer) {
        score++;
    }

    if (currentQuestion === questions.length - 1) {

        showResult();



        setTimeout(function () {
            openVideo();
        }, 600);

        return;
    }



    currentQuestion++;
    showQuestion();

});



function showResult() {

    quizPage.classList.add("hidden");
    resultPage.classList.remove("hidden");

    finalScore.textContent =
        `${score} / ${questions.length}`;

    if (score === 3) {

        resultMessage.textContent =
            "Perfect! You really know your Java basics! ☕🔥";

    }
    else if (score === 2) {

        resultMessage.textContent =
            "Good job! You already know the basics of Java. 👍";

    }
    else {

        resultMessage.textContent =
            "Keep practicing! You will get better at Java. 💙";

    }

}



restartBtn.addEventListener("click", function () {

    resultPage.classList.add("hidden");
    landingPage.classList.remove("hidden");

    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;

});



function openVideo() {

    videoModal.classList.add("show");



    quizVideo.currentTime = 0;


    quizVideo.muted = false;
    quizVideo.volume = 1.0;

    const playPromise = quizVideo.play();

    if (playPromise !== undefined) {

        playPromise.catch(function (error) {
            console.log(
                "Browser blocked autoplay with sound.",
                error
            );
        });

    }

}



closeVideo.addEventListener("click", function () {
    closeVideoPopup();
});



videoModal.addEventListener("click", function (event) {

    if (event.target === videoModal) {
        closeVideoPopup();
    }

});



function closeVideoPopup() {

    videoModal.classList.remove("show");
    quizVideo.pause();
    quizVideo.currentTime = 0;

}



themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("night");

    if (document.body.classList.contains("night")) {
        themeToggle.textContent = "☀️ Day Mode";
    }
    else {
        themeToggle.textContent = "🌙 Night Mode";
    }

});