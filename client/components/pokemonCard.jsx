import React, { Component } from 'react';
import Relay from 'react-relay';

class PokemonCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('props pokemoncard', this.props);
    let typesArray = this.props.pokemon.type  || [];
    let typelist = typesArray.map( type => type.name ).join('-');
    return (
      <li className="pokemonCard">
        Name: {this.props.pokemon.name} | Number: {this.props.pokemon.id} | Type(s): {typelist}
      </li>
    )
  }
}
export default Relay.createContainer(PokemonCard, {
  fragments: {
    pokemon: () => Relay.QL`
      fragment on Pokemon {
        name
        id
        type {
          name
        }
      }
    `
  }
})
