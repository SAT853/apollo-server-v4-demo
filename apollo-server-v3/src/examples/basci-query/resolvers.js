const books = [
  { id: '1', name: 'Wings Of Fire', category: 'Autobiography', authorId: '1' },
  { id: '2', name: 'India 2020', category: 'Inspirational', authorId: '1' },
  { id: '3', name: 'Mrutyunjay', category: 'Inspirational', authorId: '2' },
];

const authors = [
  { id: '1', name: 'Dr. APJ Abdul Kalam', age: 70 },
  { id: '2', name: 'Shivaji Sawant', age: 75 },
  { id: '3', name: 'Ranjit Desai', age: 50 },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args, context, info) => {
      return books.find((b) => b.id === args.id);
    },
    authors: () => authors,
    author: (parent, args, context, info) => {
      return authors.find((a) => a.id === args.id);
    },
  },
};

module.exports = resolvers;
