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
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');
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
      }).catch(function (e) {
        console.error(e);
      });
    }

    //This should show pokemon details in console when clicked
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
        showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
      });
    }

    function showModal(name, height, image) {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML = '';
      let modal = document.createElement('div');
      modal.classList.add('modal');


      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = '[X]';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = name;

      let contentElement = document.createElement('p');
      contentElement.innerText = "Height: " + height;

      let imageElement = document.createElement('img');
      imageElement.id = "pokemonImage";
      imageElement.src = image;

      let replacementImage = document.createElement('img');
      replacementImage.id = "pokeball";
      replacementImage.src = 'https://i.imgur.com/hi1EglF.gif';

      let replacementMessage = document.createElement('p');
      replacementMessage.id = "replacementMessage";
      replacementMessage.innerText = "You have caught the Pokemon!";

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(imageElement);
      modal.appendChild(replacementImage);
      modal.appendChild(replacementMessage);
      modalContainer.appendChild(modal);
      modalContainer.classList.add('is-visible');
      imageElement.classList.add('is-visible');
      imageElement.addEventListener('click', hideImage);
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    //Close the modal if the user presses the Escape key
    let modalContainer = document.querySelector('#modal-container');
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    //Close the modal if the user clicks anywhere outside of the modal
    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    function hideImage() {
        let imageElement = document.querySelector('#pokemonImage');
        imageElement.classList.remove('is-visible');
        let replacementImage = document.querySelector('#pokeball');
        replacementImage.classList.add('is-visible');
        let replacementMessage = document.querySelector('#replacementMessage');
        replacementMessage.classList.add('is-visible');
    };

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    };

})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

// pokemonRepository.add({name: 'Pikachu', height: 5, type: "electric"});
//This is a test to see if non-pokemon can be added
// pokemonRepository.add('Cow');

// Object.keys(pokemonRepository).forEach(function(property) {
// console.log(pokemonRepository[property]);
// });
//
// pokemonRepository.getAll().forEach(function (pokemon) {
//   pokemonRepository.addListItem(pokemon);
// });
//
// fetch('https://pokeapi.co/api/v2/pokemon/').then(function (response) {
//   return response.json(); // This returns a promise!
// }).then(function (pokemonList) {
//   console.log(pokemonList); // The actual JSON response
// }).catch(function () {
//   // Error
// });
