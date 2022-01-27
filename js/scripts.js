let pokemonList = [
  {name: "Bulbasaur", height: 7, type: "grass"},
  {name: "Charizard", height: 15, type: "fire"},
  {name: "Blastoise", height: 10, type: "water"}
  ];
for (let i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + ' \(height:' + pokemonList[i].height + '\) ' +"<br>");

if (pokemonList[i].height > 10)
document.write("-WOW, That is BIG!!!" +"<br>");
}
