
const elements = new Map(); 
elements.set('fafweg', { id: 'fafweg', name: 'grass', weakAgainst: ['fghghq3g'], strongAgainst: ['fghghq3g', 'gaehh', 'hw4j5heahe'] });
elements.set('fghghq3g', { id: 'fghghq3g', name: 'fire', weakAgainst: ['gaehh', 'hw4j5heahe'], strongAgainst: ['fafweg'] });
elements.set('gaehh', { id: 'gaehh', name: 'water', weakAgainst: ['fafweg', 'tjjata'], strongAgainst: ['fghghq3g', 'hw4j5heahe'] });
elements.set('tjjata', { id: 'tjjata', name: 'electric', weakAgainst: ['hw4j5heahe'], strongAgainst: ['gaehh'] });
elements.set('hw4j5heahe', { id: 'hw4j5heahe', name: 'normal', weakAgainst: ['hw4j5heahe'], strongAgainst: [] });
elements.set('hthat', { id: 'hw4j5heahe', name: 'rock', weakAgainst: ['fafweg', 'gaehh'], strongAgainst: ['fghghq3g', 'tjjata', 'hw4j5heahe'] });

const pokemon = new Map();
pokemon.set('1', { id: '1', name: 'Bulbasaur', type: ['fafweg'], evolvesFrom: null, evolvesInto: ['2'] });
pokemon.set('2', { id: '2', name: 'Ivysaur', type: ['fafweg'], evolvesFrom: '1', evolvesInto: ['3'] });
pokemon.set('3', { id: '3', name: 'Venasaur', type: ['fafweg'], evolvesFrom: '2', evolvesInto: [] });
pokemon.set('4', { id: '4', name: 'Squirtle', type: ['gaehh'], evolvesFrom: null, evolvesInto: ['5'] });
pokemon.set('5', { id: '5', name: 'Wartortle', type: ['gaehh'], evolvesFrom: '4', evolvesInto: ['6'] });
pokemon.set('6', { id: '6', name: 'Blastoise', type: ['gaehh'], evolvesFrom: '5', evolvesInto: [] });
pokemon.set('7', { id: '7', name: 'Charmander', type: ['fghghq3g'], evolvesFrom: null, evolvesInto: ['8'] });
pokemon.set('8', { id: '8', name: 'Charmeleon', type: ['fghghq3g'], evolvesFrom: '7', evolvesInto: ['9'] });
pokemon.set('9', { id: '9', name: 'Charizard', type: ['fghghq3g'], evolvesFrom: '8', evolvesInto: [] });
pokemon.set('25', { id: '25', name: 'Pikachu', type: ['tjjata'], evolvesFrom: null, evolvesInto: ['26'] });
pokemon.set('26', { id: '26', name: 'Raichu', type: ['tjjata'], evolvesFrom: '25', evolvesInto: [] });
pokemon.set('133', { id: '133', name: 'Eevee', type: ['hw4j5heahe'], evolvesFrom: null, evolvesInto: ['134', '135', '136'] });
pokemon.set('134', { id: '134', name: 'Vaporeon', type: ['gaehh'], evolvesFrom: '133', evolvesInto: [] });
pokemon.set('135', { id: '135', name: 'Flareon', type: ['fghghq3g'], evolvesFrom: '133', evolvesInto: [] });
pokemon.set('136', { id: '136', name: 'Jolteon', type: ['tjjata'], evolvesFrom: '133', evolvesInto: [] });

const users = new Map();
users.set('user', { id: '1', pokemon: [...pokemon.keys()] } )

const dataFetchers = {
  findPokemonById: (id) => pokemon.get(id),
  findElementById: (id) => elements.get(id),
  findPersonById: (id) => users.get(id)
};

export default dataFetchers;
