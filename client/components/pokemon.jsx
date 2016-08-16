import React, { Component } from 'react';

class PokemonCard extends Component {

  componentWillReceiveProps({pokemon}) {
    this.state.set({ pokemon });
    let isBasicPokemon = !!pokemon.evolvedFrom;
    this.state.set({ isBasicPokemon });
  }

  render() {
    return(
      <div></div>
    )
  }
}
