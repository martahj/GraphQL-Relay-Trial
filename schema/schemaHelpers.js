import dataFetchers from './hardcodedData';

export default {
  // getPokemon: (id) => {
  //   console.log('in export function');
  //   return new Promise( (resolve, reject) => {
  //     console.log('in new rpomise');
  //     dataFetchers.findPokemonById(id)
  //     .then( result => {
  //       console.log('got result from asyncronous', result);
  //       resolve(result);
  //     })
  //     .catch( err => {
  //       console.log('got err from async', err);
  //       reject(err);
  //     })
  //   })
  // },
  getPokemon: (id) => dataFetchers.findPokemonById(id),
  getElement: (id) => dataFetchers.findElementById(id),
  getPreviousEvolution: (id) => getPreviousEvolution(id),
  getNextEvolution: (id) => getNextEvolution(id)
}
