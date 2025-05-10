import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schemas";
import db from "./config/connection";
import { authMiddleware } from "./utils/auth";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(
        `API server running on http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
}

startServer();
