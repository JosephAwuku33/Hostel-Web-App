import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./css/index.css";
import { ApolloClient, InMemoryCache, createHttpLink,  ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { URI } from "./config/configs.ts";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";


const httpLink = createHttpLink({
  uri: URI
});


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const userString = localStorage.getItem('userInfo');
  const user = userString ? JSON.parse(userString) : null;
  const token = user ? user.token : null;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});



const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
