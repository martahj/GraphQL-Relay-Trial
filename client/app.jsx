import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
// import Pokemon from './components/pokemon';
const POKEMON_ID = 1;

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('props', this.props);
    console.log('viewer props', this.props.viewer);
    console.log('viewer pokemon', this.props.viewer.pokemon);
    return (
      <div className="bucket">
        World says hi
        <h1>Number: {this.props.viewer.id}</h1>
      </div>
    )
  }
}

export default Relay.createContainer(App, {
  initialVariables: {
    id: '2'
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        pokemon(id: $id) {
          id
          name
        }
      }
    `
  }
})
