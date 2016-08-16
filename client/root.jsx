"use strict"
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import App from './app';
const POKEMON_ID = 2;

class PokemonRoute extends Relay.Route {
  static routeName = 'PokemonRoute';
  static path = '/';
  static queries = {
    pokemon: () => Relay.QL`query { pokemon(id: $pokemonId) }`
  };
  static paramDefinitions = {
    pokemonId: {required: true}
  }
}

// Relay.injectNetworkLayer(
//   new Relay.DefaultNetworkLayer('http://localhost:7000/graphql', {
//     headers: {
//       'content-type': 'application/graphql',
//       'Content-Type': 'application/graphql'
//     }
//   })
// )

Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer('http://localhost:7000/graphql'));

let rootComponent = <Relay.RootContainer
                      Component={App}
                      route={new PokemonRoute({pokemonId: POKEMON_ID})}
                    />
let rootNode = document.getElementById('root');
ReactDOM.render(rootComponent, rootNode);
