const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} = graphql;

const booksList = [
  { id: '1', name: 'Wings Of Fire', category: 'Autobiography', authorId: '1' },
  { id: '2', name: 'India 2020', category: 'Inspirational', authorId: '1' },
  { id: '3', name: 'Mrutyunjay', category: 'Inspirational', authorId: '2' },
];

const authorsList = [
  { id: '1', name: 'Dr. APJ Abdul Kalam', age: 70 },
  { id: '2', name: 'Shivaji Sawant', age: 75 },
  { id: '3', name: 'Ranjit Desai', age: 50 },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, _) {
        return authorsList.find((a) => a.id == parent.id);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, _) {
        return booksList.filter((book) => book.authorId == parent.id);
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, { id, name, age }) {
        let newAuthor = { id, name, age };
        authorsList.push(newAuthor);
        return newAuthor;
      },
    },
    addBook: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        author: { type: GraphQLString },
      },
      resolve(parent, { id, name, category, author }) {
        let newBook = { id, name, category, author };
        booksList.push(newBook);
        return newBook;
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return booksList.find((b) => b.id == args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // code to get data from db
        return booksList;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return authorsList.find((a) => a.id == args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authorsList;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

/*
 ========= Queries =======
1. Get All Books
{
  books {
    name
  }
}
2. Get Book by Id
{
  book(id:"1"){
    name
  }
}

Nested Query:-
1. Get Details of author with book
{
  book(id: "1") {
    name
    category
    author {
      id
      name
    }
  }
}
========= Queries =======

======= mutation =======
 mutation {
  addAuthor(id: 1, name: "Sathishkumar Raja", age: 27){
    __typename,
    name,
    age
  }
}
======= mutation =======
*/
