const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      mylollypath {
        getLollies {
          data {
            _id
            lollyPath
          }
        }
      }
    }
  `)

  console.log(result)
  result.data.mylollypath.getLollies.data.map(loly => {
    createPage({
      path: `lollies/${loly.lollyPath}`,
      component: path.resolve(`./src/templates/template.jsx`),
      context: {
        lollypath: loly.lollyPath,
      },
    })
  })
}
