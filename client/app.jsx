import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import Pokemon from './components/pokemon';
import Prevolutions from './components/prevolutions'

const POKEMON_ID = '133';

class App extends Component {

  constructor(props) {
    super(props);
  }

  renderPrevolution (prevolution) {
    console.log('prevoltuion', prevolution);
    if (prevolution) {
      return (
        <div>
          <h3>Evolves from::</h3>
          <Pokemon pokemon={prevolution}/>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Does not evolve from anything</h3>
        </div>
      )
    }
  }

  render() {
    console.log('app pokemon', this.props.viewer.pokemon);
    return (
      <div className="bucket">
        <h1>Welcome to the most beautifully styled app you've ever seen</h1>
        <h5>World says hi back</h5>
        <Pokemon pokemon={this.props.viewer.pokemon}/>
      </div>
    )
  }
}

export default Relay.createContainer(App, {
  initialVariables: {
    pokemonId: POKEMON_ID
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        pokemon(id: $pokemonId) {
          ${Pokemon.getFragment('pokemon')}
          ${Prevolutions.getFragment('pokemon')}
        }
      }
    `
  }
})
