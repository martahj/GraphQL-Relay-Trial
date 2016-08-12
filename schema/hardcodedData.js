
const elements = new Map(); //so we can use integers as keys
elements.set(1, { id: 1, name: 'grass', weakAgainst: [2], strongAgainst: [] });
elements.set(2, { id: 2, name: 'fire', weakAgainst: [3, 6], strongAgainst: [] });
elements.set(3, { id: 3, name: 'water', weakAgainst: [1, 4], strongAgainst: [] });
elements.set(4, { id: 4, name: 'electric', weakAgainst: [6], strongAgainst: [] });
elements.set(5, { id: 5, name: 'normal', weakAgainst: [6], strongAgainst: [] });
elements.set(6, { id: 6, name: 'rock', weakAgainst: [1, 3], strongAgainst: [] });

const pokemon = new Map();
pokemon.set(1, { id: 1, name: 'Bulbasaur', type: [1] });
pokemon.set(2, { id: 2, name: 'Ivysaur', type: [1] });
pokemon.set(3, { id: 3, name: 'Venasaur', type: [1] });
pokemon.set(4, { id: 4, name: 'Squirtle', type: [3] });
pokemon.set(5, { id: 5, name: 'Wartortle', type: [3] });
pokemon.set(6, { id: 6, name: 'Blastoise', type: [3] });
pokemon.set(7, { id: 7, name: 'Charmander', type: [2] });
pokemon.set(8, { id: 8, name: 'Charmeleon', type: [2] });
pokemon.set(9, { id: 9, name: 'Charizard', type: [2] });
pokemon.set(25, { id: 25, name: 'Pikachu', type: [4] });
pokemon.set(26, { id: 26, name: 'Raichu', type: [4] });
pokemon.set(133, { id: 133, name: 'Eevee', type: [5] });
pokemon.set(134, { id: 134, name: 'Vaporeon', type: [3] });
pokemon.set(135, { id: 135, name: 'Flareon', type: [2] });
pokemon.set(136, { id: 136, name: 'Jolteon', type: [4] });

export default {
  findById: (id) => new Promise(resolve, reject) => resolve(pokemon.get(id)),

}
