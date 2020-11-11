import cors from 'micro-cors'
import { ApolloServer, gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    name: String
  }
`

const resolvers = {
  Query: {},
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export default cors((req, res) => (req.method === 'OPTIONS' ? res.end() : handler(req, res)))
