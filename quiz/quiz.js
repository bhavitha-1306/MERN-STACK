// Wait until the entire HTML document is fully loaded before running JS
document.addEventListener("DOMContentLoaded", () => {

  // Get references to all required HTML elements using their IDs
  const startBtn = document.getElementById("start-btn");         // Start button
  const nextBtn = document.getElementById("next-btn");           // Next button
  const restartBtn = document.getElementById("restart-btn");     // Restart button
  const questionContainer = document.getElementById("question-container"); // Question section
  const questionText = document.getElementById("question-text"); // Question text
  const choicesList = document.getElementById("choices-list");   // List of answer choices
  const resultContainer = document.getElementById("result-container"); // Result section
  const scoreDisplay = document.getElementById("score");         // Score display

  // Array of question objects
  const questions = [
    {
      question: "What is the capital of France?",  // Question text
      choices: ["Paris", "London", "Berlin", "Madrid"], // Options
      answer: "Paris", // Correct answer
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  // Track the index of the current question
  let currentQuestionIndex = 0;

  // Track the user's score
  let score = 0;

  // When Start button is clicked, start the quiz
  startBtn.addEventListener("click", startQuiz);

  // When Next button is clicked
  nextBtn.addEventListener("click", () => {

    // Move to the next question
    currentQuestionIndex++;

    // If there are still questions left
    if (currentQuestionIndex < questions.length) {
      showQuestion(); // Show next question
    } else {
      showResult(); // Otherwise show result screen
    }
  });

  // When Restart button is clicked
  restartBtn.addEventListener("click", () => {

    // Reset question index
    currentQuestionIndex = 0;

    // Reset score
    score = 0;

    // Hide result screen
    resultContainer.classList.add("hidden");

    // Start quiz again
    startQuiz();
  });

  // Function to start quiz
  function startQuiz() {

    // Hide Start button
    startBtn.classList.add("hidden");

    // Hide result container (if visible)
    resultContainer.classList.add("hidden");

    // Show question container
    questionContainer.classList.remove("hidden");

    // Display first question
    showQuestion();
  }

  // Function to display current question
  function showQuestion() {

    // Hide Next button until user selects an answer
    nextBtn.classList.add("hidden");

    // Set question text from questions array
    questionText.textContent = questions[currentQuestionIndex].question;

    // Clear old answer choices
    choicesList.innerHTML = "";

    // Loop through choices of current question
    questions[currentQuestionIndex].choices.forEach((choice) => {

      // Create new list item element
      const li = document.createElement("li");

      // Set text of list item
      li.textContent = choice;

      // When user clicks this choice, call selectAnswer()
      li.addEventListener("click", () => selectAnswer(choice));

      // Add the list item to choices list
      choicesList.appendChild(li);
    });
  }

  // Function to handle answer selection
  function selectAnswer(choice) {

    // Get correct answer of current question
    const correctAnswer = questions[currentQuestionIndex].answer;

    // If selected answer matches correct answer
    if (choice === correctAnswer) {
      score++; // Increase score
    }

    // Show Next button after selecting an answer
    nextBtn.classList.remove("hidden");
  }

  // Function to show final result
  function showResult() {

    // Hide question container
    questionContainer.classList.add("hidden");

    // Show result container
    resultContainer.classList.remove("hidden");

    // Display score in result section
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }

});
