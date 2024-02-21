import { URI } from "@/config/configs";
import { store } from "@/redux/store";
import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { FC, PropsWithChildren } from "react";
import { setCredentials } from "@/redux/auth/authSlice";

const httpLink = new HttpLink({
  uri: URI,
  credentials: "include",
});

async function getRefreshToken() {
  console.log(store.getState().auth.token);
  try {
    const response = await fetch("users/refresh", {
      method: "GET",
      credentials: "include",
    });
    const { accessToken } = await response.json();
    store.dispatch(setCredentials({ accessToken })); // Implement this function to set the token in local storage or Redux store
    console.log("Token refreshed successfully.");
    console.log(accessToken);
    console.log(store.getState().auth.token);
    return accessToken;
  } catch (err) {
    console.log(err);
  }
}

const authLink = setContext(async (_, { headers }) => {
  let token = store.getState()?.auth?.token;

  // If token is null, attempt to refresh it
  if (!token) {
    try {
      const refreshToken = await getRefreshToken();
      token = refreshToken;
    } catch (err) {
      console.error("Failed to refresh access token:", err);
    }
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  const oldHeaders = operation.getContext().headers;
  console.log(oldHeaders);
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions.code) {
        case "UNAUTHENTICATED":
          operation.setContext(async ({ headers = {} }) => {
            const token = await getRefreshToken();
            return {
              headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
              },
            };
          });
      }
    }
    return forward(operation);
  }

  return forward(operation);
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

const ApolloProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;
