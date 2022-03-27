import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: offsetLimitPagination(),
      },
    },
  },
});

const headers = {
  "x-hasura-admin-secret":
    "qPLEvvF1VdqV6mh2SVCk3t520ZHUCRXsaPQTMZHcA571KmzgR4A4wSD7AFkiEQYR",
};
const uri = "https://petsura.hasura.app/v1/graphql";

const client = new ApolloClient({
  uri,
  cache,
  headers,
});

export default client;
