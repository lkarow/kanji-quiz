// IIFE for kanjiList
let kanjiRepository = (() => {
  let kanjiList = [];

  // api url
  const apiURL = 'https://kanjiapi.dev/v1/kanji/';
  const apiURLGradeOne = 'https://kanjiapi.dev/v1/kanji/grade-1';
  const apiURLGradeTwo = 'https://kanjiapi.dev/v1/kanji/grade-2';
  const apiURLGradeThree = 'https://kanjiapi.dev/v1/kanji/grade-3';
  const apiURLGradeFour = 'https://kanjiapi.dev/v1/kanji/grade-4';
  const apiURLGradeFive = 'https://kanjiapi.dev/v1/kanji/grade-5';
  const apiURLGradeSix = 'https://kanjiapi.dev/v1/kanji/grade-6';

  // buttons, containers & other elements
  const answerButtons = document.querySelectorAll('.answer-btn');
  const answerOne = document.getElementById('answer-one');
  const answerTwo = document.getElementById('answer-two');
  const answerThree = document.getElementById('answer-three');
  const answerFour = document.getElementById('answer-four');
  const startButton = document.getElementById('start');
  const nextButton = document.getElementById('next');
  const kanjiInfoButton = document.getElementById('kanji-info');
  const exitButton = document.getElementById('exit');
  const startContainer = document.getElementById('start-container');
  const questionContainer = document.getElementById('question-container');
  const answerContainer = document.getElementById('answer-container');
  const counterSection = document.getElementById('counter');
  const spinner = document.getElementById('spinner');
  const startBtnTxt = document.getElementById('start-btn-txt');
  const gradeSwitches = document.querySelectorAll('.form-check-input');

  // counter for right & wrong answers
  let counterRightAnswer = 0;
  let counterWrongAnswer = 0;

  // function to fetch info about kanji and return info to populate array
  async function fetchKanjiInfo(kanji) {
    let response = await fetch(apiURL + kanji);
    let data = await response.json();
    return await data;
  }

  // function to add kanji to kanjiList
  function add(kanji) {
    kanjiList.push(kanji);
  }

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  // function to fetch all kanji and store in kanjiList
  async function fetchKanji() {
    const gradeOne = document.getElementById('first-grade');
    const gradeTwo = document.getElementById('second-grade');
    const gradeThree = document.getElementById('third-grade');
    const gradeFour = document.getElementById('fourth-grade');
    const gradeFive = document.getElementById('fifth-grade');
    const gradeSix = document.getElementById('sixth-grade');

    if (gradeOne.checked === true) {
      let response = await fetch(apiURLGradeOne);
      let data = await response.json();
      for await (const item of data) {
        let kanji = await fetchKanjiInfo(item);
        add(kanji);
        await sleep(100);
      }
    }

    if (gradeTwo.checked === true) {
      let response = await fetch(apiURLGradeTwo);
      let data = await response.json();
      for await (const item of data) {
        let kanji = await fetchKanjiInfo(item);
        add(kanji);
        await sleep(100);
      }
    }

    if (gradeThree.checked === true) {
      let response = await fetch(apiURLGradeThree);
      let data = await response.json();
      for await (const item of data) {
        let kanji = await fetchKanjiInfo(item);
        add(kanji);
        await sleep(100);
      }
    }

    if (gradeFour.checked === true) {
      let response = await fetch(apiURLGradeFour);
      let data = await response.json();
      for await (const item of data) {
        let kanji = await fetchKanjiInfo(item);
        add(kanji);
        await sleep(100);
      }
    }

    if (gradeFive.checked === true) {
      let response = await fetch(apiURLGradeFive);
      let data = await response.json();
      for await (const item of data) {
        let kanji = await fetchKanjiInfo(item);
        add(kanji);
        await sleep(100);
      }
    }

    if (gradeSix.checked === true) {
      let response = await fetch(apiURLGradeSix);
      let data = await response.json();
      for await (const item of data) {
        let kanji = await fetchKanjiInfo(item);
        add(kanji);
        await sleep(100);
      }
    }
  }

  // select random kanji from kanjiList
  function randomKanji() {
    let randomKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];
    return randomKanji;
  }

  // select meaning of random kanji which is not the answer kanji
  function randomMeaning() {
    let randomObj = randomKanji();
    if (randomObj === rightKanji) {
      randomObj = randomKanji();
    } else {
      return randomObj.meanings[0];
    }
  }

  // attach wrong answers to DOM
  function showWrongAnswers() {
    answerOne.innerText = randomMeaning();
    answerTwo.innerText = randomMeaning();
    answerThree.innerText = randomMeaning();
    answerFour.innerText = randomMeaning();
  }

  let rightKanji;
  // select kanji for question and right answer
  // attach question to DOM
  function showQuestion() {
    rightKanji = randomKanji();

    questionContainer.innerText = rightKanji.kanji;

    // attach right kanji to random button
    let randomButtonNumber = Math.floor(Math.random() * 4);
    switch (randomButtonNumber) {
      case 0:
        answerOne.innerText = rightKanji.meanings[0];
        break;
      case 1:
        answerTwo.innerText = rightKanji.meanings[0];
        break;
      case 2:
        answerThree.innerText = rightKanji.meanings[0];
        break;
      case 3:
        answerFour.innerText = rightKanji.meanings[0];
        break;
    }
  }

  function displayCounter() {
    const rightAnswerDisplay = document.getElementById('right-answers');
    const wrongAnswerDisplay = document.getElementById('wrong-answers');

    rightAnswerDisplay.innerHTML = counterRightAnswer;
    wrongAnswerDisplay.innerHTML = counterWrongAnswer;
  }

  function rightAnswer(element) {
    for (const button of answerButtons) {
      button.classList.remove('btn-outline-primary');
      button.classList.add('btn-danger');
      button.classList.add('disabled');
    }
    element.classList.remove('btn-danger');
    element.classList.add('btn-success');
    element.classList.add('disabled');

    // add counter for right answers plus 1 and display
    counterRightAnswer++;
    displayCounter();

    // block key input
    keyOneFired = true;
    keyTwoFired = true;
    keyThreeFired = true;
    keyFourFired = true;

    // enable kanji info button
    kanjiInfoButton.disabled = false;
  }

  function wrongAnswer(element) {
    element.classList.remove('btn-outline-primary');
    element.classList.add('btn-danger');
    element.classList.add('disabled');
    counterWrongAnswer++;
    displayCounter();
  }

  function checkAnswer(answer) {
    if (answer.innerText === rightKanji.meanings[0]) {
      rightAnswer(answer);
      console.log(`Right answer`);
    } else {
      wrongAnswer(answer);
      console.log(`Wrong answer`);
    }
  }

  // click events for answer buttons
  answerOne.addEventListener('click', (e) => checkAnswer(e.target));
  answerTwo.addEventListener('click', (e) => checkAnswer(e.target));
  answerThree.addEventListener('click', (e) => checkAnswer(e.target));
  answerFour.addEventListener('click', (e) => checkAnswer(e.target));

  let keyOneFired = false;
  let keyTwoFired = false;
  let keyThreeFired = false;
  let keyFourFired = false;
  // key events for answers
  document.addEventListener('keypress', (e) => {
    if (e.key === '1' && !keyOneFired) {
      keyOneFired = true;
      checkAnswer(answerOne);
    } else if (e.key === '2' && !keyTwoFired) {
      keyTwoFired = true;
      checkAnswer(answerTwo);
    } else if (e.key === '3' && !keyThreeFired) {
      keyThreeFired = true;
      checkAnswer(answerThree);
    } else if (e.key === '4' && !keyFourFired) {
      keyFourFired = true;
      checkAnswer(answerFour);
    }
  });

  async function start() {
    startButton.disabled = true;
    spinner.classList.remove('invisible');
    startBtnTxt.classList.add('invisible');
    await fetchKanji();
    showWrongAnswers();
    showQuestion();
    questionContainer.classList.remove('hidden');
    answerContainer.classList.remove('hidden');
    nextButton.classList.remove('hidden');
    kanjiInfoButton.classList.remove('hidden');
    exitButton.classList.remove('hidden');
    counterSection.classList.remove('hidden');
    startContainer.classList.add('hidden');
    counterRightAnswer = 0;
    counterWrongAnswer = 0;
  }
  startButton.addEventListener('click', start);

  // clear style of all answer buttons
  function cleanAnswerButtons() {
    for (const button of answerButtons) {
      button.classList.remove('btn-danger');
      button.classList.remove('btn-success');
      button.classList.add('btn-outline-primary');
      button.classList.remove('disabled');
    }
  }

  // eventListener for next button to get new question & answers
  nextButton.addEventListener('click', (e) => {
    keyOneFired = false;
    keyTwoFired = false;
    keyThreeFired = false;
    keyFourFired = false;
    e.preventDefault();
    cleanAnswerButtons();
    showWrongAnswers();
    showQuestion();
    kanjiInfoButton.disabled = true;
  });

  kanjiInfoButton.addEventListener('click', (e) => {
    const kanjiInfoModalTitle = document.getElementById(
      'kanji-info-modal-title'
    );
    const modalMeanings = document.getElementById('modal-meanings');
    const modalKunReading = document.getElementById('modal-kun-reading');
    const modalOnReading = document.getElementById('modal-on-reading');
    const modalStrokes = document.getElementById('modal-strokes');
    const modalJlpt = document.getElementById('modal-jlpt');

    kanjiInfoModalTitle.innerText = rightKanji.kanji;
    modalMeanings.innerText = rightKanji.meanings.join(', ');
    modalKunReading.innerText = rightKanji.kun_readings.join(', ');
    modalOnReading.innerText = rightKanji.on_readings.join(', ');
    modalStrokes.innerText = rightKanji.stroke_count;
    modalJlpt.innerText = rightKanji.jlpt;
  });

  function exit() {
    cleanAnswerButtons();
    questionContainer.classList.add('hidden');
    answerContainer.classList.add('hidden');
    nextButton.classList.add('hidden');
    kanjiInfoButton.classList.add('hidden');
    kanjiInfoButton.disabled = true;
    exitButton.classList.add('hidden');
    counterSection.classList.add('hidden');
    startContainer.classList.remove('hidden');
    spinner.classList.remove('visible');
    spinner.classList.add('invisible');
    startBtnTxt.classList.remove('invisible');

    for (const gradeSwitch of gradeSwitches) {
      gradeSwitch.checked = false;
    }

    // clear kanji array
    kanjiList.length = 0;
  }
  exitButton.addEventListener('click', exit);

  // disable start button unless at least one grade is selected
  function checkKanjiGrade() {
    for (const gradeSwitch of gradeSwitches) {
      gradeSwitch.onchange = function () {
        startButton.disabled = !gradeSwitch.checked;
      };
    }
  }
  checkKanjiGrade();
})();
