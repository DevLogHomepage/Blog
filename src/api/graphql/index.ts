export const typeDefs = `
  type Query {
    Book: [Book]
  }

  type Book {
    title: String,
    author: String
  }
`

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];
export const resolvers = {
  Query: {
    Book() {
      return books;
    }
  }
}