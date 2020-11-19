let manager = {
  basePlayerHp: 0,
  baseEnemyHp: 0,

  gameOver: false,

  setBasePlayerHp: (value) => this.basePlayerHp = value,

  setGameStart: function (pokemon) {
    this.resetPlayer(pokemon);
    this.setPreFight();
  },
  resetPlayer: (pokemon) => {

    const arena = document.querySelector(".arena");
    const interface = document.querySelector(".interface");
    const health = pokemon.stats[0].base_stat;
    const attack = pokemon.stats[1].base_stat;
    const defense = pokemon.stats[2].base_stat;
    const specialAttack = pokemon.stats[3].base_stat;
    const specialDefense = pokemon.stats[4].base_stat;
    const speed = pokemon.stats[5].base_stat;
    
    player = new Pokemon(name, health, speed, attack, defense);
    localStorage.setItem('basePlayerHp', player.health)

    basePlayerHp = player.health

    interface.innerHTML = ""
    arena.style.display = 'flex'
    arena.innerHTML = `
    <div class='player'>
    <h3>${pokemon.name}</h3>
    <img id='playerImg' src='${pokemon.sprites.back_default}' />
      <div id='hpBar'>
      <p id='hpValue' class='health-player'>${health} / ${this.basePlayerHp}</p>
      <progress id="hpPlayer" value="100" max="100"></progress>
      </div>
    </div>
    `;
  },
  setPreFight: () => {
    window.alert("hey");
  },
  setFight: (randomPokemon) => {
    const arena = document.querySelector(".arena");
    const enemyEl = document.createElement("div");
    enemyEl.classList.add("player");
    const health = randomPokemon.stats[0].base_stat;
    const attack = randomPokemon.stats[1].base_stat;
    const defense = randomPokemon.stats[2].base_stat;
    const specialAttack = randomPokemon.stats[3].base_stat;
    const specialDefense = randomPokemon.stats[4].base_stat;
    const speed = randomPokemon.stats[5].base_stat;
    enemy = new Pokemon(name, health, speed, attack, defense);
    localStorage.setItem('baseEnemyHp', enemy.health);
    baseEnemyHp = enemy.health;
    document.querySelector('.fight').classList.remove('hidden')
    document.querySelector('.log').classList.remove('hidden')

    const audio = document.createElement('audio')
    audio.innerHTML = '<source src="./assets/battle.mp3" type="audio/mpeg">'
    audio.setAttribute('autoplay', 'true')

    enemyEl.innerHTML = `
    <h3>${randomPokemon.name}</h3>
    <img id='enemyImg' src='${randomPokemon.sprites.front_default}' />
      <div id='hpBar'>
      <p id='hpValue' class='health-enemy'>${health} /${this.baseEnemyHp}</p>
      <progress id="hpEnemy" value="100" max="100"></progress>
      </div>
    `;
    arena.appendChild(enemyEl);
    arena.appendChild(audio)
  },
  endFight: () => {
    document.querySelector('.log').classList.add('hidden')
    document.querySelector('.fight').classList.add('hidden')
    const endText = enemy.health <= 0 ? 'You win!' : 'You lose!'

    document.querySelector('.arena').innerHTML = `
    <div class='end'>
      <p>${endText}</p>
      <button class="playAgain" onclick="fetchPoke.pokemon()">Play Again</button>
    </div>
    `;
  }
};
