/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNoteByLambda = /* GraphQL */ `
  query GetNoteByLambda($input: getNoteInput) {
    getNoteByLambda(input: $input) {
      id
      name
      description
      image
      owner
      createdAt
      updatedAt
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
      owner
      createdAt
      updatedAt
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
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
