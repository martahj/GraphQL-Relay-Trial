
const elements = new Map(); //so we can use integers as keys
elements.set(1, { id: 1, name: 'grass', weakAgainst: [2], strongAgainst: [] });
elements.set(2, { id: 2, name: 'fire', weakAgainst: [3, 6], strongAgainst: [] });
elements.set(3, { id: 3, name: 'water', weakAgainst: [1, 4], strongAgainst: [] });
elements.set(4, { id: 4, name: 'electric', weakAgainst: [6], strongAgainst: [] });
elements.set(5, { id: 5, name: 'normal', weakAgainst: [6], strongAgainst: [] });
elements.set(6, { id: 6, name: 'rock', weakAgainst: [1, 3], strongAgainst: [] });

const pokemon = new Map();
pokemon.set(1, { id: 1, name: 'Bulbasaur', type: [1], family: [2, 3] });
pokemon.set(2, { id: 2, name: 'Ivysaur', type: [1], evolvesFrom: 1, evolvesInto: 3 });
pokemon.set(3, { id: 3, name: 'Venasaur', type: [1], evolvesFrom: 2, evolvesInto: null });
pokemon.set(4, { id: 4, name: 'Squirtle', type: [3], family: [5, 6] });
pokemon.set(5, { id: 5, name: 'Wartortle', type: [3], evolvesFrom: 4, evolvesInto: 6 });
pokemon.set(6, { id: 6, name: 'Blastoise', type: [3], evolvesFrom: 5, evolvesInto: null });
pokemon.set(7, { id: 7, name: 'Charmander', type: [2], family: [8, 9] });
pokemon.set(8, { id: 8, name: 'Charmeleon', type: [2], evolvesFrom: 7, evolvesInto: 9 });
pokemon.set(9, { id: 9, name: 'Charizard', type: [2], evolvesFrom: 8, evolvesInto: null });
pokemon.set(25, { id: 25, name: 'Pikachu', type: [4], family: [26] });
pokemon.set(26, { id: 26, name: 'Raichu', type: [4], evolvesFrom: 25, evolvesInto: null });
pokemon.set(133, { id: 133, name: 'Eevee', type: [5], family: [134, 135, 136] });
pokemon.set(134, { id: 134, name: 'Vaporeon', type: [3], evolvesFrom: 133, evolvesInto: null });
pokemon.set(135, { id: 135, name: 'Flareon', type: [2], evolvesFrom: 133, evolvesInto: null });
pokemon.set(136, { id: 136, name: 'Jolteon', type: [4], evolvesFrom: 133, evolvesInto: null });

const dataFetchers = {
  findPokemonById: (id) => pokemon.get(id),
  findElementById: (id) => {
    console.log('trying to find element with id', id);
    elements.get(id)
  },
  getPreviousEvolution: (id) => new Promise( (resolve, reject) => {
    let myPokemon = pokemon.get(id);
    if (!myPokemon) {
      reject(undefined);
    } else if (myPokemon.evolvesFrom){
      return dataFetchers.findPokemonById(myPokemon.evolvesFrom)
      .then( prevolution => resolve(prevolution) )
    } else {
      resolve(null);
    }
  }),
  getNextEvolution: (id) => new Promise( (resolve, reject) => {
    let myPokemon = pokemon.get(id);
    if (!myPokemon) {
      reject(undefined);
    } else if (myPokemon.evolvesInto) {
      return dataFetchers.findPokemonById(myPokemon.evolvesInto)
      .then( prevolution => resolve(prevolution) )
    } else {
      resolve(null);
    }
  })

}

export default dataFetchers;
