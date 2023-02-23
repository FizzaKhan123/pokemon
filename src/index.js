import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { offsetLimitPagination } from "@apollo/client/utilities";
const client = new ApolloClient({
  uri: "https://graphqlpokemon.favware.tech/v7",
  cache: new InMemoryCache(),
});

// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         feed: {
//           read(existing, { args: { offset, take } }) {
//             // A read function should always return undefined if existing is
//             // undefined. Returning undefined signals that the field is
//             // missing from the cache, which instructs Apollo Client to
//             // fetch its value from your GraphQL server.
//             return existing && existing.slice(offset, offset + take);
//           },

//           // The keyArgs list and merge function are the same as above.
//           keyArgs: [],
//           merge(existing, incoming, { args: { offset = 0 } }) {
//             const merged = existing ? existing.slice(0) : [];
//             for (let i = 0; i < incoming.length; ++i) {
//               merged[offset + i] = incoming[i];
//             }
//             return merged;
//           },
//         },
//       },
//     },
//   },
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
