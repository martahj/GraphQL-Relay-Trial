import dataFetchers from './hardcodedData';

export default {
  getPokemon: (id) => dataFetchers.findPokemonById(id),
  getElement: (id) => dataFetchers.findElementById(id),
  getPreviousEvolution: (id) => getPreviousEvolution(id),
  getNextEvolution: (id) => getNextEvolution(id)
}
