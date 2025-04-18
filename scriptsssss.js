const questions = [
    {
      type: "single", // Single-select question
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      type: "multi", // Multi-select question
      question: "Which of these are programming languages?",
      options: ["Python", "HTML", "CSS", "JavaScript"],
      answer: ["Python", "JavaScript"],
    },
    {
      type: "fill", // Fill-in-the-blank question
      question: "Complete the phrase: 'To be or not to __.'",
      answer: "be",
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options");
  const submitBtn = document.getElementById("submit-btn");
  const scoreBox = document.getElementById("score-box");
  const scoreText = document.getElementById("score");
  const restartBtn = document.getElementById("restart-btn");
  
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
  
    if (currentQuestion.type === "single" || currentQuestion.type === "multi") {
      currentQuestion.options.forEach((option, index) => {
        const inputType = currentQuestion.type === "single" ? "radio" : "checkbox";
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.innerHTML = `
          <input type="${inputType}" name="option" id="option-${index}" value="${option}">
          <label for="option-${index}">${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
      });
    } else if (currentQuestion.type === "fill") {
      const inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.id = "fill-input";
      inputElement.placeholder = "Type your answer here...";
      optionsContainer.appendChild(inputElement);
    }
  }
  
  function checkAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (currentQuestion.type === "single") {
      const selectedOption = document.querySelector('input[name="option"]:checked');
      if (selectedOption && selectedOption.value === currentQuestion.answer) {
        score++;
      }
    } else if (currentQuestion.type === "multi") {
      const selectedOptions = Array.from(document.querySelectorAll('input[name="option"]:checked')).map(
        (input) => input.value
      );
      if (JSON.stringify(selectedOptions.sort()) === JSON.stringify(currentQuestion.answer.sort())) {
        score++;
      }
    } else if (currentQuestion.type === "fill") {
      const fillInput = document.getElementById("fill-input");
      if (fillInput && fillInput.value.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
        score++;
      }
    }
  }
  
  function handleSubmit() {
    checkAnswer();
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showScore();
    }
  }
  
  function showScore() {
    document.getElementById("question-box").classList.add("hidden");
    document.getElementById("controls").classList.add("hidden");
    scoreBox.classList.remove("hidden");
    scoreText.textContent = `${score} / ${questions.length}`;
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("question-box").classList.remove("hidden");
    document.getElementById("controls").classList.remove("hidden");
    scoreBox.classList.add("hidden");
    loadQuestion();
  }
  
  submitBtn.addEventListener("click", handleSubmit);
  restartBtn.addEventListener("click", restartQuiz);
  
  // Load the first question
  loadQuestion();
  