const form = document.getElementById('searchingPoke');
const searchPokemon = document.getElementById('search-poke');
const pokeimage = document.getElementById('pokeimg');
const pokeinfo = document.getElementById('pokeinfo');
const pokemonsname = document.getElementById('pokemonsname');
let searchedPoke;

form.addEventListener('submit', function(e) {
  e.preventDefault();
  pokeimage.innerHTML = '';
  pokeinfo.innerHTML = '';
  pokemonsname.innerHTML = '';
  searchedPoke = searchPokemon.value;
  searchedPoke = searchedPoke.toLowerCase();
  getPokemon();
});

function getPokemon() {
  // creo la petición
  const pokeRequest = new XMLHttpRequest();
  pokeRequest.open('GET', `https://pokeapi.co/api/v2/pokemon/${searchedPoke}?limit=20&offset=20`);
  pokeRequest.onload = addPoke;
  pokeRequest.onerror = handleError;
  // envío la petición
  pokeRequest.send();
}

function handleError() {
  console.log('Se ha presentado un error');
}

function addPoke() {
  const data = JSON.parse(this.responseText);
  const notFound = data.detail;
  if(notFound == 'Not found.'){
    alert('Pokemon no encontrado, intenta nuevamente');
  } else {
    searchPokemon.value = '';
    const name = data.name;
    const img = data.sprites.front_default;
    const pokeid = data.id;
    const move1 = data.moves[0].move.name;
    const move2 = data.moves[1].move.name;
    const type = data.types[0].type.name;
    const ability1 = data.abilities[0].ability.name;
    const ability2 = data.abilities[1].ability.name;

    let pokeimg= document.createElement('img');
    pokeimg.setAttribute('src', img);
    pokeimg.setAttribute('class','pokeimg');
    
    let pokename = document.createElement('h3');
    pokename.innerHTML = '#' + pokeid + ' - ' + name;
    pokename.setAttribute('class','pokename');

    let pokedescription = document.createElement('p');
    pokedescription.innerText = 'Type: ' + type + `\n` +
    'Moves: ' + move1 + ', ' + move2 + `\n` +
    'Abilities: ' + ability1 + ', ' + ability2;

    pokeimage.appendChild(pokeimg);
    pokemonsname.appendChild(pokename);
    pokeinfo.appendChild(pokedescription);
  }
};