const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb")
const q = faunadb.query;
const shortId = require("shortid")

const typeDefs = gql`
  type Query {
    hello: String
  }
  type Lolly {
    id: ID!
    sender: String!
    message: String!
    reciever: String!
    top: String!
    middle: String!
    bottom: String!
    lollyPath: String!
  }

  type Mutation {
    createLolly(
      sender: String!
      message: String!
      reciever: String!
      top: String!
      middle: String!
      bottom: String!
    ): Lolly
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return "Hello, world!"
    },
  },
  Mutation: {
    createLolly: async (_, args) => {
      const client = new faunadb.Client({
        secret: "fnAEfzTJHdACUCrIx5S7FTOl6ltjPVUpoTmshcGT",
      })
      const iid = shortId.generate()
      args.lollyPath = iid
      const result = await client.query(
        q.Create(q.Collection("newLolly"), {
          data: args,
        })
      )
      console.log("result", result.data)
      return result.data
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
