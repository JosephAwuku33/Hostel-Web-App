import jwt from "jsonwebtoken";
import User from "../data/models/User.js";
import { GraphQLError } from "graphql";

export const getUser = async (token: any) => {
  try {
    if (!token) {
        return new GraphQLError("Token isn't here", {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
        return new GraphQLError("User does not exist", {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          });
    }
    return user;

  } catch (err) {
    console.error("Error in getUser:", err);
    return null;
  }
};
