const form = document.getElementById('searchingPoke');
const searchField = document.getElementById('search-poke');
const responseContainer = document.getElementById('pokecontainer');
let searchedPoke;

form.addEventListener('submit', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedPoke = searchField.value;
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
  // no cambiar responseText, haha
  const data = JSON.parse(this.responseText);
  const response = data.response;
  console.log(data);
}