import jwt from "jsonwebtoken";
import User from "../data/models/User.js";
import { GraphQLError } from "graphql";

export const getUser = async (token: any) => {
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

    if (!user) {
      throw new GraphQLError("User does not exist", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }

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
