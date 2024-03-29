/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNoteByLambda = /* GraphQL */ `
  mutation CreateNoteByLambda($input: createNoteInput) {
    createNoteByLambda(input: $input) {
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
export const deleteNoteByLambda = /* GraphQL */ `
  mutation DeleteNoteByLambda($input: deleteNoteInput) {
    deleteNoteByLambda(input: $input) {
      message
      __typename
    }
  }
`;
export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
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
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
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
