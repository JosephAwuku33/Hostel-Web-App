import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './css/index.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import { Provider } from 'react-redux';

const URI = 'http://localhost:4000/api';

const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    
  </React.StrictMode>,
)
