let player;
let enemy;
let opponent;

class Pokemon {
  constructor(name, health, speed, attack, defense) {
    this.name = name;
    this.health = health;
    this.speed = speed;
    this.attack = attack;
    this.defense = defense;
  }
}

const PlayerMoves = {
  calcAttack: async () => {
    const fightBtn = document.querySelector(".fight");
    const logs = document.querySelector(".logs");

    const initiateAttack = () => {
      fightBtn.classList.add("disabled");
      fightBtn.textContent = "Attacking...";
      setTimeout(() => {
        fightBtn.classList.remove("disabled");
        fightBtn.textContent = "Attack!";
      }, 10000);
    };

    const logAttack = (string) => {
      const newLog = document.createElement("p");
      newLog.classList.add("hit");
      newLog.textContent = string;
      logs.appendChild(newLog);
    };

    initiateAttack();

    const playerSpeed = player.speed;
    const enemySpeed = enemy.speed;

    const playerAttack = () => {
      let calcBaseDamage = Math.floor(
        (player.attack / enemy.defense) * Math.floor(Math.random() * 15)
      );
      return calcBaseDamage;
    };

    const enemyAttack = () => {
      let calcBaseDamage = Math.floor(
        (enemy.attack / player.defense) * Math.floor(Math.random() * 15)
      );
      return calcBaseDamage;
    };

    const getPlayerHealth = document.querySelector(".health-player");
    const getEnemyHealth = document.querySelector(".health-enemy");
    const baseEnemyHp = JSON.parse(localStorage.getItem("baseEnemyHp"));
    const basePlayerHp = JSON.parse(localStorage.getItem("basePlayerHp"));

    const decreaseHealthBar = (pokemon, damage) => {
      const healthbar = document.querySelector(`#hp${pokemon}`);
      if (pokemon === "Enemy") {
        enemy.health = enemy.health - damage;
        !damage
          ? logAttack("You did not hit at all...")
          : logAttack(`You hit for ${damage} damage!`);
        if (enemy.health <= 0) {
          getEnemyHealth.innerHTML = "0";
          logAttack("You won!");
          manager.endFight();
        } else {
          getEnemyHealth.innerHTML = `${enemy.health} / ${baseEnemyHp}`;
        }
        let newHpValue = enemy.health / baseEnemyHp;
        healthbar && (healthbar.value = (newHpValue * 100).toFixed());
      } else {
        player.health = player.health - damage;
        !damage
          ? logAttack("You were not hit at all...")
          : logAttack(`You were hit for ${damage} damage!`);
        if (player.health <= 0) {
          getPlayerHealth.innerHTML = "0";
          logAttack("You lost!");
          manager.endFight();
        } else {
          getPlayerHealth.innerHTML = `${player.health} / ${basePlayerHp}`;
        }
        let newHpValue = player.health / basePlayerHp;
        healthbar && (healthbar.value = (newHpValue * 100).toFixed());
      }
    };

    const animateAttack = (attacker) => {
      const playerImg = document.getElementById("playerImg");
      const enemyImg = document.getElementById("enemyImg");
      if (attacker === "Player") {
        playerImg && playerImg.classList.add("attacking");
        enemyImg && enemyImg.classList.add("blinking");
        setTimeout(() => {
          playerImg && playerImg.classList.remove("attacking");
          enemyImg && enemyImg.classList.remove("blinking");
        }, 5000);
      } else {
        enemyImg && enemyImg.classList.add("attacking");
        playerImg && playerImg.classList.add("blinking");
        setTimeout(() => {
          enemyImg && enemyImg.classList.remove("attacking");
          playerImg && playerImg.classList.remove("blinking");
        }, 5000);
      }
    };

    if (playerSpeed >= enemySpeed) {
      const playerAttackValue = playerAttack();
      playerAttackValue && animateAttack("Player");
      setTimeout(() => {
        decreaseHealthBar("Enemy", playerAttackValue);
      }, 2500);

      if (enemy.health > 0) {
        const enemyAttackValue = enemyAttack();
        setTimeout(() => enemyAttackValue && animateAttack("Enemy"), 5000);
        setTimeout(() => {
          decreaseHealthBar("Player", enemyAttackValue);
        }, 7500);
      }
    } else if (enemySpeed > playerSpeed) {
      const enemyAttackValue = enemyAttack();
      enemyAttackValue && animateAttack("Enemy");
      setTimeout(() => {
        decreaseHealthBar("Player", enemyAttackValue);
      }, 2500);

      if (player.health > 0) {
        const playerAttackValue = playerAttack();
        setTimeout(() => playerAttackValue && animateAttack("Player"), 5000);
        setTimeout(() => {
          decreaseHealthBar("Enemy", playerAttackValue);
        }, 7500);
      }
    }
  },
};
