const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { loadFilesSync } = require("@graphql-tools/load-files");

const typesArray = loadFilesSync("**/*", {
  extensions: ["graphql"],
});

const resolversArray = loadFilesSync("**/*", {
  extensions: ["resolvers.js"],
});

const server = new ApolloServer({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

async function startApolloServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 400 },
  });

  console.log(`🚀 Server ready at: ${url}`);
}

startApolloServer();
