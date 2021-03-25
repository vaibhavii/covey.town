import { gql } from 'apollo-server-express';

/**
 * Represents the schema : All the queries , mutations are defined here.
 */
export const typeDefs = gql`
type Query {
  users: [User!]
  user(id: ID!): User
}

type User {
  id: ID!
  userName: String
  email: String
}


input signUpInput {
  userName: String !
  email: String
  password : String!
}

input loginInput {
  email: String!
  password: String!
}

input townJoinRequestInput {
  userName: String!
  coveyTownID: String!
}

input townCreateRequestInput {
  friendlyName: String!
  isPubliclyListed: Boolean!
}

input updateUserInput {
  id: ID!
  userName: String
  email: String
  password: String
}

input deleteUserInput {
  email: String
}

type UserLocation {
  x: Int!
  y: Int!
  rotation: String!
  moving : Boolean!
}

type Player {
  _id: String!
  _userName: String!
  location: UserLocation!
}

type Town {
  coveyUserID: String!
  coveySessionToken: String!
  providerVideoToken: String!
  currentPlayers: [Player!]
  friendlyName: String!
  isPubliclyListed: Boolean!
}

type TownJoinResponse {
  isOK: Boolean!
  response: Town
  message : String
}

type TownCreateResponse {
  coveyTownID: String
  coveyTownPassword: String
}

type TownCreateResponseEnevelope {
  isOK: Boolean!
  response: TownCreateResponse
  message : String
}

type Mutation {
  signUp(input: signUpInput) : User
  townJoinRequest(input: townJoinRequestInput): TownJoinResponse
  townCreateRequest(input: townCreateRequestInput): TownCreateResponseEnevelope
  updateUser(input: updateUserInput): Boolean
  deleteUser(input: deleteUserInput): Boolean
}
`;