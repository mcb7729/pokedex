let pokemonList = [
  {name: "Bulbasaur", height: 7, type: "grass"},
  {name: "Charizard", height: 15, type: "fire"},
  {name: "Blastoise", height: 10, type: "water"}
  ];
for (let i = 0; i < pokemonList.length; i++) {
  document.write("<p>" + pokemonList[i].name + ' \(height:' + pokemonList[i].height + '\)' + "</p>");

if (pokemonList[i].height > 10)
document.write("-WOW, That is BIG!!!");
}

function divide(dividend, divisor) {
  if (divisor===0) {
    return "You are trying to divide by 0."
    }
    else {
      let result = dividend / divisor;
      return result;
    }
}

console.log(divide(4, 2));
console.log(divide(7, 0));
console.log(divide(1, 4));
console.log(divide(12, -3));
