import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { MyContext } from "./types/context.js";
import { GraphQLError } from "graphql";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs } from "./api/graphql/schemas/hostelSchema.js";
import { resolvers } from "./api/graphql/resolvers/hostelResolver.js";
import { connectDB } from "./api/config/db.js";
import userRouter from "./api/routes/userRoutes.js";
import { getUser } from "./api/util/getUser.js";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

const API_PORT = process.env.API_PORT || 4000;
const LOCALHOST = process.env.CLIENT_URL;

const corsOptions = {
  origin: LOCALHOST, // Replace with your allowed origin(s)
  methods: ["GET,HEAD,PUT,PATCH, POST,DELETE"],
  credentials: true, // Enable cookies and other credentials in CORS requests
};

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
connectDB();

app.use(
  "/users",
  bodyParser.json(),
  cors(corsOptions),
  express.urlencoded({ extended: false }),
  userRouter
);

app.use(
  "/api",
  cors<cors.CorsRequest>(corsOptions),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      let token = "";
      // Log the value of the Authorization header
      console.log("Authorization header:", req.headers.authorization);

      if (req.headers.authorization) {
        // Attempt to split the Authorization header
        const authHeaderParts = req.headers.authorization.split(" ");
        console.log("Authorization header parts:", authHeaderParts);

        // Ensure that the token part exists and is not empty
        token = authHeaderParts[1] || "";
      } else {
        return res.json({ message: "Unauthorized - No Authorization Token" });
      }

      
      console.log(`This is the ${token}`);

      // Try to retrieve a user with the token or access it from passport's session state
      const user = await getUser(token);
      console.log(user?.first_name);

      // optionally block the user
      // we could also check user roles/permissions here

      if (!user) {
        // throwing a `GraphQLError` here allows us to specify an HTTP status code,
        // standard `Error`s will have a 500 status code by default

        return new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      } else {
        // Add the user to the context
        console.log(user);
        return { user };
      }
    },
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: API_PORT }, resolve)
);

console.log(`🚀 Server ready at http://localhost:4000/api/`);
