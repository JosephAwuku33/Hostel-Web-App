import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./css/index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { URI } from "./config/configs.ts";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

const client = new ApolloClient({
  uri: URI,
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
