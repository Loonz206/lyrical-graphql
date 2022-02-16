import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "react-apollo";
import ErrorBoundary from "./components/ErrorBoundary";
const App = lazy(() => import("./components/App"));

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache: cache,
  uri: "http://localhost:4000/graphql",
});

ReactDOM.render(
  <ErrorBoundary fallback={"An error has occurred"}>
    <Suspense fallback={<div>Loading...</div>}>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/">
              <App />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </Suspense>
  </ErrorBoundary>,
  document.querySelector("#root")
);
