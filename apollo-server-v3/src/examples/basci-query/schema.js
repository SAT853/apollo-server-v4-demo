const { gql } = require('apollo-server');

const typeDefs = gql`
  type Book {
    id: ID!
    name: String
    category: String
    author: Author
  }

  type Author {
    id: ID!
    name: String
    age: Int
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
  }
`;

module.exports = typeDefs;
