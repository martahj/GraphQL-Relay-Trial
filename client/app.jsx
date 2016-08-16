import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
// import Pokemon from './components/pokemon';
let POKEMON_ID = 3;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      POKEMON_ID: POKEMON_ID
    }
  }

  componentWillMount() {
    this.selectPokemon(1);
  }

  selectPokemon(id) {
    this.setState({POKEMON_ID: id});
    POKEMON_ID = id;
  }

  render() {
    console.log('props', this.props, this.props.pokemon);
    console.log('state', this.state);
    return (
      <div className="bucket">
        World says hi
        <h1>Number: {this.props.pokemon.name}</h1>
      </div>
    )
  }
}

let AppContainer = Relay.createContainer(App, {
  fragments: {
    pokemon: () => Relay.QL`
      query {
        pokemon(id: 4) {
          name
          id
        }
      }
    `
  }
});

export default { AppContainer, POKEMON_ID };
