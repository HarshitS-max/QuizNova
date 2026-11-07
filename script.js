
const quizzes = {
    general: {
        title: "Brain Booster",
        questions: [
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Earth", "Mars", "Jupiter", "Venus"],
                answer: 1,
                explanation: "Mars appears reddish because of iron oxide on its surface."
            },
            {
                question: "How many sides does a hexagon have?",
                options: ["Five", "Seven", "Six", "Eight"],
                answer: 2,
                explanation: "A hexagon is a polygon with six sides."
            },
            {
                question: "Which is the largest ocean on Earth?",
                options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                answer: 3,
                explanation: "The Pacific Ocean is the largest ocean on Earth."
            },
            {
                question: "What is the chemical symbol for water?",
                options: ["CO2", "H2O", "O2", "NaCl"],
                answer: 1,
                explanation: "A water molecule contains two hydrogen atoms and one oxygen atom."
            },
            {
                question: "Which gas do plants absorb from the atmosphere?",
                options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
                answer: 2,
                explanation: "Plants absorb carbon dioxide during photosynthesis."
            }
        ]
    },

    web: {
        title: "Code Master",
        questions: [
            {
                question: "What does HTML stand for?",
                options: [
                    "Hyper Text Markup Language",
                    "High Text Machine Language",
                    "Hyper Transfer Markup Link",
                    "Home Tool Markup Language"
                ],
                answer: 0,
                explanation: "HTML stands for Hyper Text Markup Language."
            },
            {
                question: "Which HTML tag is used for the largest heading?",
                options: ["<h6>", "<head>", "<h1>", "<heading>"],
                answer: 2,
                explanation: "The h1 tag represents the highest-level heading."
            },
            {
                question: "Which language is used to style web pages?",
                options: ["Python", "CSS", "SQL", "Java"],
                answer: 1,
                explanation: "CSS controls the appearance and layout of web pages."
            },
            {
                question: "Which symbol is used to select a class in CSS?",
                options: ["#", ".", "*", "&"],
                answer: 1,
                explanation: "A dot (.) selects a class in CSS."
            },
            {
                question: "Which language makes websites interactive?",
                options: ["HTML", "CSS", "JavaScript", "XML"],
                answer: 2,
                explanation: "JavaScript adds interactive behavior to websites."
            }
        ]
    }
};

// CURRENT QUIZ DATA

let currentQuiz = null;
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let answerChecked = false;

// SCREEN ELEMENTS

const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const quizTitle = document.getElementById("quizTitle");
const questionCounter = document.getElementById("questionCounter");
const progressPercent = document.getElementById("progressPercent");
const progressBar = document.getElementById("progressBar");

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");

// START QUIZ

function startQuiz(quizName) {
    currentQuiz = quizzes[quizName];

    currentQuestion = 0;
    score = 0;

    homeScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    quizTitle.textContent = currentQuiz.title;

    showQuestion();

    window.scrollTo(0, 0);
}

// DISPLAY QUESTION

function showQuestion() {
    selectedAnswer = null;
    answerChecked = false;

    const question = currentQuiz.questions[currentQuestion];
    const totalQuestions = currentQuiz.questions.length;

    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${totalQuestions}`;

    progressPercent.textContent = `${Math.round(progress)}%`;
    progressBar.style.width = `${progress}%`;

    questionText.textContent = question.question;

    optionsContainer.innerHTML = "";

    feedback.className = "feedback hidden";
    feedback.textContent = "";

    nextButton.disabled = true;
    nextButton.textContent = "Check Answer";

    const letters = ["A", "B", "C", "D"];

    question.options.forEach(function (option, index) {
        const button = document.createElement("button");

        button.className = "option-button";

        const letter = document.createElement("span");
        letter.className = "option-letter";
        letter.textContent = letters[index];

        const optionText = document.createElement("span");
        optionText.textContent = option;

        button.appendChild(letter);
        button.appendChild(optionText);

        button.addEventListener("click", function () {
            selectAnswer(index);
        });

        optionsContainer.appendChild(button);
    });
}

// SELECT ANSWER

function selectAnswer(index) {
    if (answerChecked) {
        return;
    }

    selectedAnswer = index;

    const buttons = optionsContainer.querySelectorAll(".option-button");

    buttons.forEach(function (button, buttonIndex) {
        button.classList.toggle(
            "selected",
            buttonIndex === selectedAnswer
        );
    });

    nextButton.disabled = false;
}

// CHECK ANSWER

function checkAnswer() {
    if (selectedAnswer === null || answerChecked) {
        return;
    }

    answerChecked = true;

    const question = currentQuiz.questions[currentQuestion];
    const buttons = optionsContainer.querySelectorAll(".option-button");

    const isCorrect = selectedAnswer === question.answer;

    if (isCorrect) {
        score++;
    }

    buttons.forEach(function (button, index) {
        button.disabled = true;

        if (index === question.answer) {
            button.classList.add("correct");
        }

        if (index === selectedAnswer && !isCorrect) {
            button.classList.add("wrong");
        }
    });

    feedback.classList.remove("hidden");

    if (isCorrect) {
        feedback.classList.add("correct-feedback");
        feedback.textContent = "Correct! " + question.explanation;
    } else {
        feedback.classList.add("wrong-feedback");
        feedback.textContent = "Not quite. " + question.explanation;
    }

    nextButton.textContent =
        currentQuestion === currentQuiz.questions.length - 1
            ? "See Results →"
            : "Next Question →";
}

// NEXT QUESTION

function nextQuestion() {
    if (!answerChecked) {
        checkAnswer();
        return;
    }

    currentQuestion++;

    if (currentQuestion < currentQuiz.questions.length) {
        showQuestion();
    } else {
        showResults();
    }

    window.scrollTo(0, 0);
}

// RESULTS

function showResults() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const total = currentQuiz.questions.length;
    const percentage = Math.round((score / total) * 100);

    document.getElementById("finalScore").textContent =
        `${score}/${total}`;

    document.getElementById("scorePercentage").textContent =
        `${percentage}% Correct`;

    const resultHeading = document.getElementById("resultHeading");
    const resultMessage = document.getElementById("resultMessage");

    if (percentage === 100) {
        resultHeading.textContent = "Perfect Score!";
        resultMessage.textContent =
            "Amazing! You answered every question correctly.";
    } else if (percentage >= 60) {
        resultHeading.textContent = "Great Job!";
        resultMessage.textContent =
            "Well done! Keep learning and improving.";
    } else {
        resultHeading.textContent = "Keep Practicing!";
        resultMessage.textContent =
            "Every attempt helps you learn something new.";
    }

    window.scrollTo(0, 0);
}

// RESTART

function restartQuiz() {
    startQuiz(
        currentQuiz === quizzes.general
            ? "general"
            : "web"
    );
}

// RETURN HOME

function showHome() {
    homeScreen.classList.remove("hidden");
    quizScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");

    window.scrollTo(0, 0);
}
