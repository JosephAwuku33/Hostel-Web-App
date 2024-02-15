import jwt from "jsonwebtoken";
import User from "../data/models/User.js";
import { GraphQLError } from "graphql";

export const getUser = async (token: string) => {
  try {
    if (!token) {
      throw new GraphQLError("Token isn't provided", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as {
      id: string;
    };
    const user = await User.findById(decoded.id);

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
