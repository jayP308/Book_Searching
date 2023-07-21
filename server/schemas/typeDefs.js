const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    _id: ID
    bookId: String
    description: String
    title: String
    image: String
    authors: [String]
    link: String
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

input bookInput {
    bookId: String
    description: String
    title: String
    image: String
    authors: [String]
    link: String
}

type Auth {
    token: ID!
    user: User
}

type: Query {
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!) : Auth
    login(email: String!, password: String!) : Auth
    saveBook(newBook: bookInput): User
    removeBook(bookId: String!): User
}
`;

module.exports = typeDefs;