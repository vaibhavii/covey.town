import gql from 'graphql-tag';
import { TownCreateRequest, TownJoinRequest, TownDeleteRequest, TownUpdateRequest } from '../classes/TownsServiceClient';
import client from './client';

/**
 * Envelope that wraps any response from the server
 */
export interface AddFriendRequest {
  userNameTo: string;
  userNameFrom: string;
}

/**
 * Envelope that wraps any response from the server
 */
export interface AcceptFriendRequest {
  userNameTo: string;
  userNameFrom: string;
}

/**
 * Envelope that wraps any response from the server
 */
export interface RejectFriendRequest {
  userNameTo: string;
  userNameFrom: string;
}

/**
 * Envelope that wraps any response from the server
 */
export interface UpdateUserRequest {
  id: string
  userName: string
  email: string
  bio: string
  location: string
  occupation: string
  instagramLink: string
  facebookLink: string
  linkedInLink: string
  password: string
}

export interface DeleteUserRequest {
  email: string
}


/**
 * Envelope that wraps any response from the server
 */
export interface SearchUserRequest {
  username: string;
}

/**
 * Envelope that wraps any response from the server
 */
export interface User {
  id: string;
  username: string;
  email: string;
  bio: string;
  location: string;
  occupation: string;
  instagramLink: string;
  facebookLink: string;
  linkedInLink: string;
  requests: [];
  friends: [],
  sentRequests: [],
}


const findAllUsers = gql`
  query findAllUsers {
    users {
      username
      email
    }
  }
`;

const townList = gql`
  query townList {
    townList {
      isOK
      response {
        towns {
          friendlyName
          coveyTownID
          currentOccupancy
          maximumOccupancy
        }
      }
    }
  }
`;

const findAllUsersByUserNameQuery = gql`
  query findAllUsersByUserName($username: String!) {
    searchUserByUserName(username: $username) {
      id
      username
      email
    }
  }
`;

const searchUserByUserNameQuery = gql`
  query searchUserByUserName ($username: String!) {
    searchUserByUserName (username: $username){
      id
      username
      email
      bio
      location
      occupation
      instagramLink
      facebookLink
      linkedInLink
      requests
      friends
      sentRequests
    }
  }
`;

const searchUserByEmailQuery = gql`
  query searchUserByEmail ($email: String!) {
    searchUserByEmail (email: $email){
      id
      username
      email
      bio
      location
      occupation
      instagramLink
      facebookLink
      linkedInLink
      requests
      friends
      sentRequests
    }
  }
`;

const searchUserByNameQuery = gql`
  query searchUserByName ($username: String!) {
    searchUserByName (username: $username){
      id
      username
      email
      bio
      location
      occupation
      instagramLink
      facebookLink
      linkedInLink
      requests
      friends
      sentRequests
    }
  }
`;

const createTownMutation = gql`
  mutation townCreate($input: townCreateRequestInput!) {
    townCreateRequest(input: $input) {
      isOK
      response {
        coveyTownID
        coveyTownPassword
      }
      message
    }
  }
`;

const joinTownMutation = gql`
  mutation joinTown($input: townJoinRequestInput!){
    townJoinRequest(input: $input) {
      isOK
      response {
        coveyUserID
        coveySessionToken
        providerVideoToken
        currentPlayers {
          _id
          _userName
          location {
            x
            y
            rotation
            moving
          }
        }
        friendlyName
        isPubliclyListed
      }
      message
    }
  }
`;

const deleteTownMutation = gql`
  mutation deleteTown($input: townDeleteRequestInput!) {
    townDeleteRequest(input: $input) {
      isOK
      message
    }
  }
`;

const updateTownMutation = gql`
  mutation updateTown($input: townUpdateRequestInput!) {
    townUpdateRequest(input: $input) {
      isOK
      message
    }
  }
`;

const addFriendMutation = gql`
  mutation addFriend($input: addFriendInput!) {
    addFriend(input: $input)
  }
`;

const updateUserMutation = gql`
  mutation updateUser($input: updateUserInput) {
    updateUser(input: $input){
        id,
        username,
        email,
        bio,
        location,
        occupation,
        instagramLink,
        facebookLink,
        linkedInLink,
    }
  }
`;

const deleteUserMutation = gql`
  mutation deleteUser($input: deleteUserInput) {
    deleteUser(input: $input)
  }
`;

const acceptFriendMutation = gql`
  mutation acceptFriend($input: addFriendInput!) {
    acceptFriend(input: $input)
  }
`;

const rejectFriendMutation = gql`
  mutation rejectFriend($input: addFriendInput!) {
    rejectFriend(input: $input)
  }
`;

export const findAllUserProfiles = async (): Promise<any> => {
  const { data } = await client.query({ query: findAllUsers });
  return data.users;
};

export const findAllUsersByUserName = async (username: string): Promise<any> => {
  const { data } = await client.query({ query: findAllUsersByUserNameQuery, variables: { username } });
  return data.searchUserByUserName;
};

export const searchUserByUserName = async (userName: string): Promise<any> => {
  const { data } = await client.query({
    query: searchUserByUserNameQuery,
    variables: { userName },
  });
  return data.searchUserByUserName;
}

export const searchUserByEmail = async (email: string): Promise<any> => {
  const { data } = await client.query({
    query: searchUserByEmailQuery,
    variables: { email },
  });
  return data.searchUserByEmail;
}

export const searchUserByName = async (username: string): Promise<any> => {
  const { data } = await client.query({
    query: searchUserByNameQuery,
    variables: { username },
  });
  return data.searchUserByName;
}

export const addFriend = async (payload: AddFriendRequest): Promise<any> => {
  const { data } = await client.mutate({
    mutation: addFriendMutation,
    variables: {input: payload},
  });
  return data.addFriend;
}

export const acceptFriend = async (payload: AcceptFriendRequest): Promise<any> => {
  const { data } = await client.mutate({
    mutation: acceptFriendMutation,
    variables: {input: payload},
  });
  return data.acceptFriend;
}

export const rejectFriend = async (payload: RejectFriendRequest): Promise<any> => {
  const { data } = await client.mutate({
    mutation: rejectFriendMutation,
    variables: {input: payload},
  });
  return data.rejectFriend;
}

export const updateUser = async (payload: UpdateUserRequest): Promise<any> => {
  console.log(payload)
  const { data } = await client.mutate({
    mutation: updateUserMutation,
    variables: {input: payload},
  });
  return data.updateUser;
}

export const deleteUser = async (payload: DeleteUserRequest): Promise<any> => {
  const { data } = await client.mutate({
    mutation: deleteUserMutation,
    variables: {input: payload},
  });
  return data.deleteUser;
}



export default class GraphqlServiceClient {
  private graphqlClient = client;

  listTown = async (): Promise<any> => {
    const { data } = await this.graphqlClient.query({ query: townList });
    return data.townList.response;
  };


  createTown = async (payload: TownCreateRequest): Promise<any> => {
    const { data } = await this.graphqlClient.mutate({
      mutation: createTownMutation,
      variables: { input: payload },
    });
    if (data.townCreateRequest.isOK) {
      return data.townCreateRequest.response;
    }
    throw new Error(`Error processing request: ${data.townCreateRequest.message}`);
  };

  joinTown = async (payload: TownJoinRequest): Promise<any> => {
    const { data } = await this.graphqlClient.mutate({
      mutation: joinTownMutation,
      variables: { input: payload }
    });

    if (data.townJoinRequest.isOK) {
      return data.townJoinRequest.response;
    }
    throw new Error(`Error processing request: ${data.townJoinRequest.message}`);
  };

  deleteTown = async (payload: TownDeleteRequest): Promise<any> => {
    const { data } = await this.graphqlClient.mutate({
      mutation: deleteTownMutation,
      variables: { input: payload },
    });
    if (!data.townDeleteRequest.isOK) {
      throw new Error(`Error processing request: ${data.townDeleteRequest.message}`);
    }
    return data.townDeleteRequest;
  }

  updateTown = async (payload: TownUpdateRequest): Promise<any> => {
  const { data } = await client.mutate({
    mutation: updateTownMutation,
    variables: { input: payload },
  });
  if (!data.townUpdateRequest.isOK) {
    throw new Error(`Error processing request: ${ data.townUpdateRequest.message}`);
    }
  return data.townUpdateRequest;
};
}
