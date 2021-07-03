// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Book {
      authors: [String]
      description: String
      bookId: String
      image: String
      link: String
      title: String
    }

  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
    bookCount: Int
  }

  type Auth {   # auth isn't a table.
    token: ID!
    user: User
  }

  input BookInput {
    authors: [String] # array
    description: String
    title: String
    bookId: String
    image: String
    # link: String
  }


  type Query {
    getSingleUser(username: String!): User # OK
    me: User # OK
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth # OK
    login(email: String!, password: String!): Auth # OK
    removeBook(bookId: String!): User # 
    saveBook(input: BookInput!): User #
  }

`;

module.exports = typeDefs;