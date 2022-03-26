import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://petsura.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret":
      "qPLEvvF1VdqV6mh2SVCk3t520ZHUCRXsaPQTMZHcA571KmzgR4A4wSD7AFkiEQYR",
  },
});

export default client;
