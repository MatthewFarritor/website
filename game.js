document.addEventListener('DOMContentLoaded', function () {
    const gameBoard = document.getElementById('game-board');
    const moneyDisplay = document.getElementById('money');
    const waveDisplay = document.getElementById('wave');
  
    let money = 100;
    let wave = 1;
  
    function createEnemy() {
      const enemy = document.createElement('div');
      enemy.classList.add('enemy');
      enemy.style.top = '0';
      enemy.style.left = Math.random() * (gameBoard.clientWidth - 40) + 'px';
      gameBoard.appendChild(enemy);
  
      animateEnemy(enemy);
    }
  
    function animateEnemy(enemy) {
      const speed = 2;
      const interval = setInterval(function () {
        const currentTop = parseInt(enemy.style.top);
        if (currentTop >= gameBoard.clientHeight - 40) {
          // Enemy reached the end
          clearInterval(interval);
          gameBoard.removeChild(enemy);
          money -= 10;
          updateStats();
        } else {
          enemy.style.top = currentTop + speed + 'px';
        }
      }, 20);
    }
  
    function createTower(x, y) {
      if (money >= 20) {
        const tower = document.createElement('div');
        tower.classList.add('tower');
        tower.style.top = y + 'px';
        tower.style.left = x + 'px';
        gameBoard.appendChild(tower);
  
        money -= 20;
        updateStats();
      }
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
  