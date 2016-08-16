"use strict"
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
let POKEMON_ID = 1;
import AppData from './app';
console.log('AppData', AppData);
let AppContainer = AppData.AppContainer;

class PokemonRoute extends Relay.Route {
  static routeName = 'PokemonRoute';
  static path = '/';
  static queries = {
    pokemon: () => Relay.QL`query { pokemon }`
  };
  // static paramDefinitions = {
  //   pokemonId: {required: true}
  // }
}

Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer('http://localhost:7000/graphql'));

let rootComponent = <Relay.RootContainer
                      Component={AppContainer}
                      route={new PokemonRoute()}
                    />
let rootNode = document.getElementById('root');
ReactDOM.render(rootComponent, rootNode);
