import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    savedCryptids: [Cryptid]
    savedLocations: [Location]
  }

  type Cryptid {
    _id: ID!
    name: String!
    region: String!
    description: String!
    image: String
  }

  type Location {
    _id: ID!
    name: String!
    state: String!
    legend: String!
    address: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    cryptids(state: String): [Cryptid]
    locations(state: String): [Location]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addLocation(
      name: String!
      state: String!
      legend: String!
      address: String
    ): Location
    saveCryptid(cryptidId: ID!): User
    saveLocation(locationId: ID!): User
    removeCryptid(cryptidId: ID!): User
    removeLocation(locationId: ID!): User
    addCryptid(
      name: String!
      region: String!
      description: String
      image: String
    ): Cryptid
  }
`;

export default typeDefs;
