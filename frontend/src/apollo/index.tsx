import { URI } from "@/config/configs";
import { store } from "@/redux/store";
import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  createHttpLink,
} from "@apollo/client";
import { FC, PropsWithChildren } from "react";

const httpLink = createHttpLink({
  uri: URI,
  credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
  const token = store.getState().auth.token;
  console.log(`This is the ${token}`);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const ApolloProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;
