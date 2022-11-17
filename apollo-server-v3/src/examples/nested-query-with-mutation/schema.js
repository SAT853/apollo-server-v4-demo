const { gql } = require('apollo-server');

const typeDefs = gql`
  type Product {
    id: Int
    name: String
    description: String
    category: String
    price: Int
  }

  input ProductInput {
    id: Int
    name: String
    description: String
    category: String
    price: Int
  }

  type Category {
    name: String
    products: [Product]
  }

  type Query {
    products: [Product!]
    product(id: Int!): Product
    categorys: [Category!]
  }

  type Mutation {
    createProduct(product: ProductInput): String
  }
`;
module.exports = typeDefs;
