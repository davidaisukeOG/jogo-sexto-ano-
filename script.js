const questions = [
  { category: "OPERAÇÕES", question: "Quanto é 8 × 7?", answers: ["54", "56", "64", "48"], correct: 1, explanation: "8 grupos de 7 formam 56." },
  { category: "OPERAÇÕES", question: "Qual é o resultado de 125 + 78?", answers: ["193", "203", "213", "202"], correct: 1, explanation: "125 + 78 = 203." },
  { category: "FRAÇÕES", question: "Qual fração representa a metade de uma pizza?", answers: ["1/4", "3/4", "1/2", "2/3"], correct: 2, explanation: "A metade corresponde a 1 de 2 partes iguais: 1/2." },
  { category: "NÚMEROS DECIMAIS", question: "Quanto é 2,5 + 1,3?", answers: ["3,8", "3,7", "4,8", "2,8"], correct: 0, explanation: "Somando décimos: 2,5 + 1,3 = 3,8." },
  { category: "GEOMETRIA", question: "Quantos lados tem um hexágono?", answers: ["5", "7", "8", "6"], correct: 3, explanation: "O prefixo 'hexa' indica seis. O hexágono tem 6 lados." },
  { category: "OPERAÇÕES", question: "Qual é o resultado de 144 ÷ 12?", answers: ["10", "12", "14", "16"], correct: 1, explanation: "Como 12 × 12 = 144, então 144 ÷ 12 = 12." },
  { category: "FRAÇÕES", question: "Uma barra foi dividida em 8 partes iguais. João comeu 3. Que fração sobrou?", answers: ["3/8", "8/3", "5/8", "1/8"], correct: 2, explanation: "Se 3 de 8 foram comidas, restaram 5 de 8 partes: 5/8." },
  { category: "NÚMEROS DECIMAIS", question: "Qual número é maior?", answers: ["0,7", "0,07", "0,17", "0,5"], correct: 0, explanation: "0,7 equivale a 0,70, que é maior que 0,17, 0,07 e 0,5." },
  { category: "GEOMETRIA", question: "Um retângulo tem 5 cm de comprimento e 3 cm de largura. Qual é seu perímetro?", answers: ["8 cm", "15 cm", "16 cm", "10 cm"], correct: 2, explanation: "Perímetro é a soma dos lados: 5 + 3 + 5 + 3 = 16 cm." },
  { category: "OPERAÇÕES", question: "Uma escola tem 6 turmas com 24 alunos em cada uma. Quantos alunos são ao todo?", answers: ["120", "124", "144", "164"], correct: 2, explanation: "6 × 24 = 144 alunos." }
];

const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const resultScreen = document.querySelector("#result-screen");
const startBtn = document.querySelector("#start-btn");
const nextBtn = document.querySelector("#next-btn");
const restartBtn = document.querySelector("#restart-btn");
const answersBox = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");

let currentQuestion = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let playerName = "Explorador(a)";
let answered = false;

function showScreen(screen) {
  [startScreen, gameScreen, resultScreen].forEach(item => {
    item.classList.add("hidden");
    item.hidden = item !== screen;
  });
  screen.classList.remove("hidden");
}

function startGame() {
  const typedName = document.querySelector("#player-name").value.trim();
  playerName = typedName || "Explorador(a)";
  currentQuestion = 0;
  score = 0;
  correctCount = 0;
  wrongCount = 0;
  document.querySelector("#player-greeting").textContent = `Boa sorte, ${playerName}!`;
  document.querySelector("#score").textContent = score;
  showScreen(gameScreen);
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  const item = questions[currentQuestion];
  const number = currentQuestion + 1;
  document.querySelector("#question-counter").textContent = `Pergunta ${number} de ${questions.length}`;
  document.querySelector("#progress-percent").textContent = `${Math.round(number / questions.length * 100)}%`;
  document.querySelector("#progress-bar").style.width = `${number / questions.length * 100}%`;
  document.querySelector("#category").textContent = item.category;
  document.querySelector("#question").textContent = item.question;
  feedback.textContent = "";
  feedback.className = "feedback";
  nextBtn.classList.add("hidden");
  answersBox.innerHTML = "";

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.type = "button";
    button.textContent = `${String.fromCharCode(65 + index)}) ${answer}`;
    button.addEventListener("click", () => chooseAnswer(index));
    answersBox.appendChild(button);
  });
}

function chooseAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  const item = questions[currentQuestion];
  const buttons = [...answersBox.querySelectorAll("button")];
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) button.classList.add("correct");
    else if (index === selectedIndex) button.classList.add("wrong");
  });

  if (selectedIndex === item.correct) {
    score += 10;
    correctCount++;
    feedback.textContent = `Muito bem! ✓ ${item.explanation}`;
    feedback.classList.add("good");
  } else {
    wrongCount++;
    feedback.textContent = `Quase! A resposta certa está em verde. ${item.explanation}`;
    feedback.classList.add("bad");
  }

  document.querySelector("#score").textContent = score;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "Ver resultado ★" : "Próxima pergunta ➜";
  nextBtn.classList.remove("hidden");
}

function goNext() {
  if (!answered) return;
  currentQuestion++;
  if (currentQuestion < questions.length) renderQuestion();
  else showResults();
}

function showResults() {
  showScreen(resultScreen);
  document.querySelector("#final-score").textContent = score;
  document.querySelector("#result-detail").textContent = `${correctCount} acertos • ${wrongCount} ${wrongCount === 1 ? "erro" : "erros"}`;
  let title, message, emoji;
  if (score === 100) {
    title = "Incrível, mestre da Matemática!";
    message = `Parabéns, ${playerName}! Você acertou todas as perguntas.`;
    emoji = "🏆";
  } else if (score >= 70) {
    title = "Excelente trabalho!";
    message = `Você mandou muito bem, ${playerName}! Continue praticando.`;
    emoji = "🌟";
  } else if (score >= 40) {
    title = "Boa jornada!";
    message = `Você está aprendendo, ${playerName}. Cada tentativa ajuda a melhorar!`;
    emoji = "🚀";
  } else {
    title = "Não desista!";
    message = `Toda grande descoberta começa com uma tentativa, ${playerName}. Vamos praticar mais?`;
    emoji = "💪";
  }
  document.querySelector("#result-title").textContent = title;
  document.querySelector("#result-message").textContent = message;
  document.querySelector("#result-emoji").textContent = emoji;
}

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", goNext);
restartBtn.addEventListener("click", startGame);
document.querySelector("#player-name").addEventListener("keydown", event => {
  if (event.key === "Enter") startGame();
});
