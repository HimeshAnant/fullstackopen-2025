import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Routers } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import App from "./App.jsx";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("library-app-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Routers>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Routers>
  </StrictMode>
);
