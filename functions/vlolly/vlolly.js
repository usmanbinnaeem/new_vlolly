const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb")
const q = faunadb.query
const shortId = require("shortid")
const client = new faunadb.Client({
  secret: "fnAEfzTJHdACUCrIx5S7FTOl6ltjPVUpoTmshcGT",
})
const axios = require("axios")

const typeDefs = gql`
  type Query {
    getLollies: [Lolly!]
    lollyByPath(lollyPath: String!): Lolly!
  }
  type Lolly {
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
    getLollies: async () => {
      try {
        const result = await client.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection("newLolly"))),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log("get lollies result", result)
        return result.data.map(lolly => ({ ...lolly.data }))
      } catch (err) {
        console.log("get lollies error", err);
      }
    },
    lollyByPath: async (_, { lollyPath }) => {
      try {
        console.log("lolltpath", lollyPath)
        const result = await client.query(
          q.Get(q.Match(q.Index("lolly_by_path"), lollyPath))
        )
        console.log("lolly_by_path result", result)
        return {
          id: result.ref.id,
          ...result.data,
        }
      } catch (err) {
        console.log("Lolly BY path error", err);
      }
    },
  },
  Mutation: {
    createLolly: async (_, args) => {
      try {
        const iid = shortId.generate()
        args.lollyPath = iid
        const result = await client.query(
          q.Create(q.Collection("newLolly"), {
            data: args,
          })
        )

        axios
          .post("https://api.netlify.com/build_hooks/6212264e606d73bc526e82a2")
          .then(response => {
            console.log("hook response", response)
          })
          .catch(err => {
            console.log("Hook Error", err)
          })

        console.log("result", result.data)
        return {
          id: result.ref.id,
          ...result.data,
        }
      } catch (err) {
        console.log("Mutation Error", err)
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
