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
    viewer: () => Relay.QL`query { viewer(id: $viewerId) }`
  };
  static paramDefinitions = {
    viewerId: {required: true}
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
                      route={new PokemonRoute({viewerId: 1})}
                    />
let rootNode = document.getElementById('root');
ReactDOM.render(rootComponent, rootNode);
