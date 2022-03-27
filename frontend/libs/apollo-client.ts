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
  "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SCRET as string,
};
const uri = "https://petsura.hasura.app/v1/graphql";

const client = new ApolloClient({
  uri,
  cache,
  headers,
});

export default client;
