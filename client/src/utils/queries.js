import { gql } from "@apollo/client";

// GET Query to get users information
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