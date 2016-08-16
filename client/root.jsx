"use strict"
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import App from './app';

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

Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer('http://localhost:7000/graphql'));

let rootComponent = <Relay.RootContainer
                      Component={App}
                      route={new PokemonRoute({viewerId: 'user'})}
                    />
let rootNode = document.getElementById('root');
ReactDOM.render(rootComponent, rootNode);
