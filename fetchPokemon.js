let allPokemonData = [];
let allPokemonDataDetails = [];

// Initializing an object so that fetchPokemon becomes available to other scripts
const fetchPoke = {
  pokemon: () => fetchPokemon(),
};

const fetchPokemon = async () => {
  const fight = document.querySelector('.fight')
  const log = document.querySelector('.log')
  const logs = document.querySelector(".logs")
  const arena = document.querySelector('.arena')
  const interface = document.querySelector('.interface')
  
  // Wiping out current data when restarted
  fight.classList.add("hidden");
  log.classList.add("hidden");
  arena.style.display = "none";
  interface.innerHTML = "";
  arena.innerHTML = "";

  // To prevent a bug of seeing the last log
  setTimeout(() => (logs.innerHTML = ""), 2000);
  allPokemonData = [];
  allPokemonDataDetails = [];

  await axios({
    method: "get",
    url: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40",
  }).then((res) => {
    allPokemonData = res.data.results;
  });

  const promises = allPokemonData.map((pokemon) =>
    axios({ method: "get", url: pokemon.url })
  );

  const responses = await Promise.all(promises).then((data) => data);

  allPokemonDetails = responses.forEach((response) =>
    allPokemonDataDetails.push(response.data)
  );

  const generatePokemonInfo = (pokemon) => {
    let hp = pokemon.stats[0].base_stat;
    let attack = pokemon.stats[1].base_stat;
    let defense = pokemon.stats[2].base_stat;
    let specialAttack = pokemon.stats[3].base_stat;
    let specialDefense = pokemon.stats[4].base_stat;
    let speed = pokemon.stats[5].base_stat;
    let ability = pokemon.abilities.find((obj) => !obj.is_hidden);

    return `
    <a class='pokemon'>
    <div class='details'>
    <p class='name'>${pokemon.name}</p>
            <p>Ability: ${ability.ability.name}</p> 
            <p>Move 1: ${pokemon.moves[0].move.name}</p>
            <p>Move 2: ${pokemon.moves[1].move.name}</p>
            <p>Move 3: ${pokemon.moves[2].move.name}</p>
            <p>Move 4: ${pokemon.moves[3].move.name}</p>
            <p>Speed: ${speed}</p>
            <p>Special Defense: ${specialDefense}</p>
            <p>Special Attack: ${specialAttack}</p>
            <p>Defense: ${defense}</p>
            <p>Attack: ${attack}</p>
            <p>HP: ${hp}</p>
            </div>
      <img src=${pokemon.sprites.front_default} height='150px' alt="" />
    </a>
    `;
  };

  const html = await allPokemonDataDetails.map((pokemon) => {
    return generatePokemonInfo(pokemon);
  });

  interface.innerHTML = html.join("");

  const elements = document.querySelectorAll(".pokemon");
  elements.forEach((el) => {
    el.addEventListener("click", () => {
      const name = el.querySelector(".name").textContent;
      const pokemon = allPokemonDataDetails.find((obj) => obj.name === name);
      manager.resetPlayer(pokemon);

      // Ensuring that the randomly selected pokemon isn't the pokemon selected by the player
      const randomNum = Math.floor(Math.random() * (allPokemonData.length - 1));
      const potentialOponents = allPokemonDataDetails.filter(
        (obj) => obj.name !== name
      );
      const randomPokemon = potentialOponents[randomNum];
      manager.setFight(randomPokemon);
    });
  });
};

fetchPoke.pokemon();
