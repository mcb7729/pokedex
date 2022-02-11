let pokemonRepository = (function () {
  //This is the list of all pokemon to be included
  let pokemonList = [
    {name: "Bulbasaur", height: 7, type: "grass"},
    {name: "Charizard", height: 15, type: "fire"},
    {name: "Blastoise", height: 10, type: "water"}
    ];

    function add(pokemon) {
      if (typeof pokemon === 'object') {
        pokemonList.push(pokemon);
    }
    }

    function getAll() {
      return pokemonList;
    }

    function addListItem(pokemon){

      let list = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');
      listItem.appendChild(button);
      list.appendChild(listItem);
      buttonEventListener(button, pokemon);
    }
    //This should add event listener to each pokemon button
    function buttonEventListener(button, pokemon){
      button.addEventListener('click', function(){
        showDetails(pokemon);
      });
    }
    //This should show pokemon details in console when clicked
    function showDetails(pokemon){
      console.log(pokemon);
    }

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    };

})();

pokemonRepository.add({name: 'Pikachu', height: 5, type: "electric"});
//This is a test to see if non-pokemon can be added
pokemonRepository.add('Cow');

Object.keys(pokemonRepository).forEach(function(property) {
console.log(pokemonRepository[property]);
});

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
