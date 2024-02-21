import jwt from "jsonwebtoken";
import User from "../data/models/User.js";
import { GraphQLError } from "graphql";
import { decode } from "punycode";

export const getUser = async (token: string, tokenSecret: string) => {
  try {
    if (!token) {
      throw new GraphQLError("Token isn't provided", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }

    const decoded = jwt.verify(token, tokenSecret) as {
      id: string;
    };
    const user = await User.findById(decoded.id);


    console.log(user)
    return user;
  } catch (err) {
    console.error("Error in getUser:", err);

    // Handle other errors
    throw new GraphQLError("Authentication error", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
};
