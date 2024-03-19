const quizData = [
    {
      question: 'What is the extension of a C++ source file?',
      options: ['.cpp', '.cc', '.cxx', 'All of the above'],
      answer: 'All of the above',
    },
    {
      question: 'What is the correct syntax for declaring a function in C++?',
      options: ['func myFunction() {}', ' function myFunction() {}', 'void myFunction() {}', 'def myFunction() {}'],
      answer: 'void myFunction() {}',
    },
    {
      question: 'What is the difference between ++i and i++ in C++?',
      options: ['They are equivalent', '++i increments i before using its value, while i++ increments i after using its value', '++i decrements i before using its value, while i++ decrements i after using its value', 'There is no difference'],
      answer: '++i increments i before using its value, while i++ increments i after using its value',
    },
    {
      question: 'Which of the following data types is not available in C++?',
      options: ['bool', ' char', 'string', 'byte'],
      answer: 'byte',
    },
    {
      question: 'What is the size of an int data type in C++?',
      options: [
        '1 byte',
        '2 bytes',
        '4 bytes',
        '8 bytes',
      ],
      answer: '4 bytes',
    },
    {
      question: 'What does the "sizeof" operator return in C++?',
      options: ['Size of the variable in bytes', ' Size of the variable in bits', 'Address of the variable', 'Type of the variable'],
      answer: 'Size of the variable in bytes',
    },
    {
      question: 'What is the correct way to initialize an array in C++?',
      options: [
        'int arr[] = {1, 2, 3};',
        'int arr[3] = {1, 2, 3};',
        'arr[] = {1, 2, 3};',
        ' All of the above',
      ],
      answer: 'int arr[3] = {1, 2, 3};',
    },
    {
      question: 'Which keyword is used to define a class in C++??',
      options: ['class', 'struct', 'define', 'private'],
      answer: 'class',
    },
    {
      question: 'What is the result of the expression 5 / 2 in C++?',
      options: [
        '2',
        '2.5',
        '2.0',
        '3',
      ],
      answer: '2',
    },
    {
      question: 'Which C++ keyword is used to dynamically allocate memory?',
      options: ['new', 'allocate', 'malloc', 'memory'],
      answer: 'new',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
          
        </p>
        <h>========================================</h>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <h>---------------------------------------</h>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();