document.addEventListener('DOMContentLoaded', function () {
  const gameBoard = document.getElementById('game-board');
  const moneyDisplay = document.getElementById('money');
  const waveDisplay = document.getElementById('wave');

  let money = 100;
  let wave = 1;

  // Constants
  const ENEMY_SPEED = 2;
  const ENEMY_REWARD = 10;
  const TOWER_COST = 20;

  function createEnemy() {
    const enemy = createGameElement('enemy');
    setElementPosition(enemy, { top: 0, left: Math.random() * (gameBoard.clientWidth - 40) });
    gameBoard.appendChild(enemy);

    animateEnemy(enemy);
  }

  function animateEnemy(enemy) {
    const interval = setInterval(function () {
      const currentTop = parseInt(enemy.style.top);
      if (currentTop >= gameBoard.clientHeight - 40) {
        // Enemy reached the end
        clearInterval(interval);
        gameBoard.removeChild(enemy);
        money -= ENEMY_REWARD;
        updateStats();
      } else {
        enemy.style.top = currentTop + ENEMY_SPEED + 'px';
      }
    }, 20);
  }

  function createTower(x, y) {
    if (money >= TOWER_COST) {
      const tower = createGameElement('tower');
      setElementPosition(tower, { top: y, left: x });
      gameBoard.appendChild(tower);

      money -= TOWER_COST;
      updateStats();
    }
  }

  function createGameElement(className) {
    const element = document.createElement('div');
    element.classList.add(className);
    return element;
  }

  function setElementPosition(element, { top, left }) {
    element.style.top = top + 'px';
    element.style.left = left + 'px';
  }

  function updateStats() {
    moneyDisplay.textContent = money;
    waveDisplay.textContent = wave;
  }

  function startWave() {
    for (let i = 0; i < wave; i++) {
      setTimeout(createEnemy, i * 1000);
    }
    wave++;
    updateStats();
  }

  gameBoard.addEventListener('click', function (event) {
    const x = event.clientX - gameBoard.getBoundingClientRect().left;
    const y = event.clientY - gameBoard.getBoundingClientRect().top;
    createTower(x, y);
  });

  setInterval(startWave, 5000);
});
