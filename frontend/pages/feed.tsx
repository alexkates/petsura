import { gql } from "@apollo/client";
import client from "libs/apollo-client";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        GetAnimals(request: { type: "" }) {
          animals {
            id
            type
          }
          pagination {
            count_per_page
          }
        }
      }
    `,
  });

  return {
    props: data,
  };
};

const Feed: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
};

export default Feed;
