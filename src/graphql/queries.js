/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNoteByLambda = /* GraphQL */ `
  query GetNoteByLambda($id: ID!) {
    getNoteByLambda(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
