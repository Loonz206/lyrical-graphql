import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "react-apollo";
import ErrorBoundary from "./components/ErrorBoundry";
const App = lazy(() => import("./components/App"));
const cache = new InMemoryCache();
const client = new ApolloClient({
  cache: cache,
  uri: "http://localhost:4000/",
});

ReactDOM.render(
  <ErrorBoundary>
    <Suspense fallback={<div>Loading...</div>}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Suspense>
  </ErrorBoundary>,
  document.querySelector("#root")
);
