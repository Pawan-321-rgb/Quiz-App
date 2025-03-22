const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerContainer = document.getElementById('timer-container');
const timeElement = document.getElementById('time');
const trackerGrid = document.getElementById('tracker-grid');

let shuffledQuestions, currentQuestionIndex;
let timeLeft = 300; // 5 minutes total time
let timerInterval;
let quizStarted = false;
let selectedAnswer = null;

// Event Listeners
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
submitButton.addEventListener('click', submitQuiz);

function startGame() {
    if (quizStarted) return; // Ensure quiz only starts once
    quizStarted = true;
    
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    timerContainer.classList.remove('hide');

    generateTracker(shuffledQuestions.length);
    startTimer();
    setNextQuestion();
}

function generateTracker(numQuestions) {
    trackerGrid.innerHTML = '';
    for (let i = 0; i < numQuestions; i++) {
        let box = document.createElement('div');
        box.classList.add('tracker-box');
        box.innerText = i + 1;
        trackerGrid.appendChild(box);
    }
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct;
        button.addEventListener('click', () => selectAnswer(button, answer.correct));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    selectedAnswer = null;
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function startTimer() {
    timeElement.innerText = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        timeElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function selectAnswer(button, isCorrect) {
    selectedAnswer = button;
    Array.from(answerButtonsElement.children).forEach(btn => {
        btn.classList.remove('correct', 'wrong');
    });
    button.classList.add(isCorrect ? 'correct' : 'wrong');

    let trackerBoxes = document.querySelectorAll('.tracker-box');
    trackerBoxes[currentQuestionIndex].classList.add(isCorrect ? 'correct-box' : 'wrong-box');

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        submitButton.classList.remove('hide');
    }
}

function submitQuiz() {
    clearInterval(timerInterval);
    timerContainer.classList.add('hide');
    questionContainerElement.innerHTML = '<h2>Quiz Completed!</h2>';
    nextButton.classList.add('hide');
    submitButton.classList.add('hide');
}

function endQuiz() {
    clearInterval(timerInterval);
    questionContainerElement.innerHTML = '<h2>Time’s up! Quiz Over.</h2>';
    nextButton.classList.add('hide');
    submitButton.classList.add('hide');
}

// Machine Learning Questions
const questions = [
    { 
        question: 'What is Machine Learning?', 
        answers: [
            { text: 'A type of programming', correct: false },
            { text: 'A subset of AI', correct: true },
            { text: 'A new language', correct: false },
            { text: 'A mathematical function', correct: false }
        ] 
    },
    { 
        question: 'Which algorithm is used for classification?', 
        answers: [
            { text: 'Linear Regression', correct: false },
            { text: 'Decision Tree', correct: true },
            { text: 'K-Means Clustering', correct: false },
            { text: 'Apriori Algorithm', correct: false }
        ] 
    },
    { 
        question: 'Which library is most used for ML in Python?', 
        answers: [
            { text: 'NumPy', correct: false },
            { text: 'Pandas', correct: false },
            { text: 'TensorFlow', correct: true },
            { text: 'Matplotlib', correct: false }
        ] 
    },
    { 
        question: 'What is overfitting?', 
        answers: [
            { text: 'When a model performs well on training but poorly on new data', correct: true },
            { text: 'When a model has too many parameters', correct: false },
            { text: 'When a model is too simple', correct: false },
            { text: 'When a model learns perfectly', correct: false }
        ] 
    },
    { 
        question: 'What is supervised learning?', 
        answers: [
            { text: 'Learning with labeled data', correct: true },
            { text: 'Learning without any labels', correct: false },
            { text: 'Learning from reinforcement signals', correct: false },
            { text: 'A combination of all methods', correct: false }
        ] 
    }
];
