let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
      if (typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }

    function getAll() {
      return pokemonList;
    }

    function addListItem(pokemon){

      let list = document.querySelector('.pokemon-list');
      list.classList.add('list-group');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.classList.add('btn', 'btn-primary');
      button.innerText = pokemon.name;
      button.classList.add('list-group-item');
      listItem.appendChild(button);
      list.appendChild(listItem);
      buttonEventListener(button, pokemon);
      let buttonWrapper = document.querySelector('.button-wrapper');
      buttonWrapper.appendChild(button);
    }
    //This should add event listener to each pokemon button
    function buttonEventListener(button, pokemon){
      button.addEventListener('click', function(){
        showDetails(pokemon);
      });
    }

    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
      }).catch(function (e) {
        console.error(e);
      });
    }

    function showDetails(item) {
      loadDetails(item).then(function () {
        showModal(item);
      });
    }

    function showModal(item) {
      // showModal function
      let modalTitle = $('.modal-title'); // modalTitle
      let modalBody = $('.modal-body'); // modalBody
      let modalWindow = $("#modalWindow").modal('show');
      // let modalHeader = $(".modal-header"); // no header so removed

      let pokemonName = $('<h2>' + item.name + '</h2>');

      let pokemonHeight = $('<p>' + 'Height: ' + item.height + '</p>');

      let pokemonWeight = $('<p>' + 'Weight: ' + item.weight + '</p>');

      let pokemonImage = $('<img class=\'pokemon-modal-image\'>');
      pokemonImage.attr('src', item.imageUrl); // pokemon image attribute loaded from 'item.imageUrl

      modalTitle.empty(); // clears the modalTitle after display
      modalBody.empty(); // clears the modalBody after display

      modalTitle.append(pokemonName); // pokemonName is displayed as the title in the modal
      modalBody.append(pokemonImage); // pokemonImage is displayed in the body of the modal
      modalBody.append(pokemonHeight); // pokemonHeight is displayed in the body of the modal
      modalBody.append(pokemonWeight); // pokemonWeight is displayed in the body of the modal
      // Below is an attempt to hide pokemon image upon click so that it can later be replaced by gif of bouncing pokeball. I had it working previously, but can't get it to work with bootstrap
      pokemonImage.addEventListener('click', function hidePokemonImage() {
        pokemonImage.classList.add('is-hidden');
      });

    }

    return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
    };


    function hideImage() {
        let imageElement = document.querySelector('#pokemonImage');
        imageElement.classList.remove('is-visible');
        let replacementImage = document.querySelector('#pokeball');
        replacementImage.classList.add('is-visible');
        let replacementMessage = document.querySelector('#replacementMessage');
        replacementMessage.classList.add('is-visible');
    };

})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
