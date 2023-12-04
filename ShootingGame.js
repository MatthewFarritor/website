document.addEventListener('DOMContentLoaded', function () {
    const player = document.getElementById('player');
    const gameContainer = document.getElementById('game-container');
    let isGameOver = false;
    let enemySpeed = 2;
  
    document.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft' && !isGameOver) {
        movePlayer(-20);
      } else if (event.key === 'ArrowRight' && !isGameOver) {
        movePlayer(20);
      } else if (event.key === ' ' && !isGameOver) {
        shoot();
      }
    });
  
    function movePlayer(distance) {
      const playerPosition = player.offsetLeft + distance;
      if (playerPosition >= 0 && playerPosition <= gameContainer.clientWidth - player.clientWidth) {
        player.style.left = playerPosition + 'px';
      }
    }
  
    function shoot() {
      const bullet = document.createElement('div');
      bullet.classList.add('bullet');
      bullet.style.left = player.offsetLeft + player.clientWidth / 2 + 'px';
      gameContainer.appendChild(bullet);
  
      const bulletInterval = setInterval(function () {
        const bulletPosition = bullet.offsetTop - 10;
        bullet.style.top = bulletPosition + 'px';
  
        if (bulletPosition <= 0) {
          clearInterval(bulletInterval);
          gameContainer.removeChild(bullet);
        }
  
        checkCollision(bullet);
      }, 16);
    }
  
    function checkCollision(bullet) {
      const enemies = document.querySelectorAll('.enemy');
      enemies.forEach(enemy => {
        if (isColliding(bullet, enemy)) {
          gameContainer.removeChild(bullet);
          respawnEnemy(enemy);
        }
      });
    }
  
    function respawnEnemy(enemy) {
      gameContainer.removeChild(enemy);
      spawnEnemy();
    }
  
    function spawnEnemy() {
      const newEnemy = document.createElement('div');
      newEnemy.classList.add('enemy');
      newEnemy.style.left = Math.random() * (gameContainer.clientWidth - 40) + 'px';
      gameContainer.appendChild(newEnemy);
      animateEnemy(newEnemy);
    }
  
    function animateEnemy(enemy) {
      const interval = setInterval(function () {
        const currentTop = parseInt(enemy.style.top);
        if (currentTop >= gameContainer.clientHeight - 40) {
          clearInterval(interval);
          if (!isGameOver) {
            gameOver();
          }
        } else {
          enemy.style.top = currentTop + enemySpeed + 'px';
        }
      }, 16);
    }
  
    function isColliding(element1, element2) {
      const rect1 = element1.getBoundingClientRect();
      const rect2 = element2.getBoundingClientRect();
      return !(rect1.right < rect2.left || 
               rect1.left > rect2.right || 
               rect1.bottom < rect2.top || 
               rect1.top > rect2.bottom);
    }
  
    function gameOver() {
      isGameOver = true;
      alert('Game Over!');
    }
  });
  