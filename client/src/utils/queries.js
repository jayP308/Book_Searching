import { gql } from "@apollo/client";

// GraphQL Queries

// Query for getting user information
export const GET_ME = gql`
  query {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        title
        authors
        description
        bookId
        image
        link
      }
    }
  }
`;