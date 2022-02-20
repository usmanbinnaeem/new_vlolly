module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "MYLOLLYPATH",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "mylollypath",
        // Url to query from
        url: "https://myvlolly.netlify.app/.netlify/functions/vlolly",
      },
    },
  ],
}
