import React, { Component } from 'react';

class PokemonCard extends Component () {

  componentWillReceiveProps ({pokemon}) {
    console.log('pokemon', pokemon);
    this.state.set({ pokemon });
    let isBasicPokemon = !!pokemon.evolvedFrom;
    this.state.set({ isBasicPokemon });
  }

  renderEvolutionPart () {
    if (this.state.isBasicPokemon) {
      let { family } = this.state.pokemon;
    } else {
      let { evolvedFrom, evolvesInto } = this.state.pokemon;
    }
  }

  renderTypes () {
    let { types } = this.props.pokemon;
    let typesText = types.length === 1 ? 'Type: ' + types[0] : 'Types: ' + types.join(' | ');
    return(
      <h4>{typesText}</h4>
    )
  }

  handleClick(e) {
    let id = { this.state.pokemon };
    //change top-level pokemon
  }

  render () {
    let pokemon = this.props.pokemon;

    return (
      <div onClick={ ()=> this.handleClick() }>
        <h3>Name : {pokemon.name}</h3>
        <h3>Number : {pokemon.id}</h3>
        <h4>{this.renderTypes()}</h4>
      </div>
    )
  }
}
