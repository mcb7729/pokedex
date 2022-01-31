let pokemonRepository = (function () {
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

    return {
      add: add,
      getAll: getAll,
    };

})();

pokemonRepository.add({name: 'Pikachu', height: 5, type: "electric"});

pokemonRepository.add('Cow');

Object.keys(pokemonRepository).forEach(function(property) {
console.log(pokemonRepository[property]);
});

pokemonRepository.getAll().forEach(function (trait) {
  if (trait.height > 10) {
    document.write(
      trait.name +
        ' (height: ' +
        trait.height +
        ') - ' +
        "Wow, that's big!" +
        '<br><br>'
    );
  }
  else document.write(
    trait.name +
    ' (height: ' +
    trait.height + ')' +
    '<br><br>');
});
