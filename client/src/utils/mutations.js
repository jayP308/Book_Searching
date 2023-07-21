import { gql } from '@apollo/client';
// Mutation for when Posting user when logging in
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation POST for when user is signing up
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation POST when user is saving a book
export const SAVE_BOOK = gql`
mutation saveBook($newBook: BookInput!) {
  saveBook(newBook: $newBook) {
    username
    email
    bookCount
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;

// Mutation POST for Removing a book
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
  removeBook(bookId: $bookId) {
    username
    email
    bookCount
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;