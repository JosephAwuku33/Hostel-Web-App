import { GraphQLError } from "graphql";

export function generateAuthError(error_message: string) {
  return new GraphQLError(error_message, {
    extensions: {
      code: "UNAUTHENTICATED",
      http: { status: 401 },
    },
  });
}
