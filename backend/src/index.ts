import "reflect-metadata";
import express from "express";
import cors from "cors";
import { dataSource } from "./database/database";
import adWs from "./controllers/adWs";
import categoryWs from "./controllers/categoryWs";
import tagWs from "./controllers/tagWs";
import { User } from "./models/User";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import TagResolver from "./resolvers/TagResolver";
import CategoryResolver from "./resolvers/CategoryResolver";
import UserResolver from "./resolvers/UserResolver";

interface MyContext {
  token?: string;
}
const app = express();
const httpServer = http.createServer(app);

const startApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [AdResolver, TagResolver, CategoryResolver, UserResolver],
  });

  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
}
startApolloServer();




// bind modules router
// app.use("/", adWs);
// app.use("/", categoryWs);
// app.use("/", tagWs);

const port = 4000;

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Exemple app listening on port ${port}`)
});