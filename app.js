let puzzle = [1, 2, 3, 4, 5, 6, 7, 8, null];
puzzle = puzzle.sort(() => Math.random() - 0.5);

const container = document.querySelector('#puzzle-container');
let time = 0;
let timerInterval;

puzzle.forEach((number, index) => {
  const block = document.createElement('div');
  block.className = 'puzzle-block';
  block.dataset.index = index;
  if (number !== null) {
    block.textContent = number;
    block.addEventListener('click', swapBlocks);
  }
  container.appendChild(block);
});

startTimer();

function startTimer() {
  timerInterval = setInterval(() => {
    time += 1;
    document.querySelector('#timer').textContent = `Time: ${time} seconds`;
  }, 1000);
}

function swapBlocks(event) {
  const clickedBlockIndex = parseInt(event.target.dataset.index);
  const emptyBlockIndex = puzzle.indexOf(null);

  if (
    [clickedBlockIndex - 1, clickedBlockIndex + 1, clickedBlockIndex - 3, clickedBlockIndex + 3].includes(emptyBlockIndex)
  ) {
    [puzzle[clickedBlockIndex], puzzle[emptyBlockIndex]] = [puzzle[emptyBlockIndex], puzzle[clickedBlockIndex]];

    container.innerHTML = '';

    puzzle.forEach((number, index) => {
      const block = document.createElement('div');
      block.className = 'puzzle-block';
      block.dataset.index = index;
      if (number !== null) {
        block.textContent = number;
        block.addEventListener('click', swapBlocks);
      }
      container.appendChild(block);
    });

    if (isPuzzleSolved()) {
      clearInterval(timerInterval);
      alert(`遊んでくれてありがとう！こんだけ時間はくさんにつかってくれたよ： ${time} seconds.`);
    }
  }
}

function isPuzzleSolved() {
  for (let i = 0; i < 8; i++) {
    if (puzzle[i] !== i + 1) {
      return false;
    }
  }
  return true;
}
