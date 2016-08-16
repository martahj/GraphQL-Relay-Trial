import dataFetchers from './hardcodedData';

export default {
  getPokemon: (id) => dataFetchers.findPokemonById(id),
  getElement: (id) => dataFetchers.findElementById(id),
  getPerson: (id) => dataFetchers.findPersonById(id)
}
