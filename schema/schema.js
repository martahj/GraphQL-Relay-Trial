import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

/*

  interface Pokemon {
    id: Integer!   //the ! at the end indicates the field is non-nullable
    name: String!
    type: [Element]
  }

  type Basic : Pokemon {
    id: Integer!
    name: String!
    type: [Element]
    family: [Pokemon]
  }

  type Evolved : Pokemon {
    id: Integer!
    name: String!
    type: [Element]
    evolvesFrom: String!
    evolvesInto: String   //this field is nullable because some Pokemon are final evolutions
  }

  type Element {
    id: Integer!
    name: String!
    weakAgainst: [Element]
    strongAgainst: [Element]
  }

  type Query {
    pokemon (id: String!): Pokemon
    element (id: String!): Element
    previousEvolution (id: String!): Pokemon
    nextEvolution (id: String!): [Pokemon] //this is an array to deal with special case Eevee
  }

 */

const pokemonInterface = new GraphQLInterfaceType({
  name: 'Pokemon',
  description: 'A pocket monster',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The numberical id assigned to a Pokemon'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The only word a pokemon can say'
    },
    type: {
      type: new GraphQLList(elementType),
      description: 'The element(s) the pokemon has special abilities related to'
    }
  })
});

const basicPokemonType = new GraphQLObjectType({
  name: 'Basic Pokemon',
  description: 'A pokemon, as it exists at the beginning of its life',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The numberical id assigned to a Pokemon'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The only word a pokemon can say'
    },
    type: {
      type: new GraphQLList(elementType),
      description: 'The element(s) the pokemon has special abilities related to'
    },
    family: {
      type: new GraphQLList(pokemonInterface),
      description: 'All pokemon this pokemon could one day become'
    }
  })
});

const evolvedPokemonType = new GraphQLObjectType({
  name: 'Evolved Pokemon',
  description: 'A pokemon that was once a different pokemon',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The numberical id assigned to a Pokemon'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The only word a pokemon can say'
    },
    type: {
      type: new GraphQLList(elementType),
      description: 'The element(s) the pokemon has special abilities related to'
    },
    evolvesFrom: {
      type: new GraphQLNonNull(pokemonInterface),
      description: 'The immediately prior pokemon in the evolution chain'
    },
    evolvesInto: {
      type: evolvedPokemonType,
      description: 'The next pokemon in the evolution chain, if one exists'
    }
  })
});

const elementType = new GraphQLObjectType({
  name: 'Element',
  description: 'Element attribute of a pokemon',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Id of the element'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'What the element is called'
    },
    weakAgainst: {
      type: new GraphQList(elementType),
      description: 'Attack types that will be super effective against pokemon of this type'
    },
    strongAgainst: {
      type: new GraphQLList(elementType),
      description: 'Pokemon types that attacks of this element will be super effective against'
    }
  })
});

// const queryType = new GraphQLObjectType({
//   name: 'Query',
//   fields: () => ({
//
//   })
// })


export default schema;
