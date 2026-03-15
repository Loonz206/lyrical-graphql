import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ErrorBoundary from "./components/ErrorBoundary";

const App = lazy(() => import("./components/App"));

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache,
});

const rootElement = document.querySelector("#root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);
root.render(
  <ErrorBoundary fallback={"An error has occurred"}>
    <Suspense fallback={<div>Loading...</div>}>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </Suspense>
  </ErrorBoundary>,
);
