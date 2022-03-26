import { gql } from "@apollo/client";
import client from "libs/apollo-client";
import { Animal } from "models/Animal";
import { GetAnimalsResponse } from "models/GetAnimalsResponse";
import { Pagination } from "models/Pagination";
import type { GetServerSideProps, NextPage } from "next";
import ScrollableFeed from "react-scrollable-feed";
import { FaBirthdayCake } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

type FeedProps = {
  animals: Animal[];
  pagination: Pagination;
};

export const getServerSideProps: GetServerSideProps<FeedProps> = async () => {
  const { data } = await client.query<GetAnimalsResponse>({
    query: gql`
      query {
        GetAnimals(request: { type: "" }) {
          animals {
            name
            age
            coat
            contact {
              email
            }
            description
            gender
            id
            photos {
              full
              large
              medium
              small
            }
            size
            status
            type
          }
          pagination {
            count_per_page
          }
        }
      }
    `,
  });

  const props: FeedProps = {
    animals: data.GetAnimals.animals,
    pagination: data.GetAnimals.pagination,
  };

  return {
    props,
  };
};

const Feed: NextPage<FeedProps> = ({ animals, pagination }) => {
  return (
    <div className="container mx-auto flex justify-center">
      <ScrollableFeed>
        {animals
          .filter((animal) => animal.photos.length > 0)
          .map((animal) => (
            <div
              key={animal.id}
              className="max-w-sm rounded-lg border border-gray-200 shadow-md mb-4"
            >
              <div className="flex flex-col items-center">
                <img
                  className="w-full h-96 object-cover"
                  src={animal.photos[0].full}
                  alt={animal.name}
                />
                <h2 className="my-4 text-3xl font-medium text-gray-900">
                  {animal.name}
                </h2>
                <div className="flex w-5/6 justify-evenly">
                  <span className="flex items-center text-sm dark:text-gray-600">
                    <FaBirthdayCake />
                    <span className="pl-2">{animal.age?.toLowerCase()}</span>
                  </span>
                  <span className="flex items-center text-sm dark:text-gray-600">
                    <MdQueryStats />
                    <span className="pl-2">{animal.status?.toLowerCase()}</span>
                  </span>
                  <span className="flex items-center text-sm dark:text-gray-600">
                    <AiOutlineColumnWidth />
                    <span className="pl-2">{animal.size?.toLowerCase()}</span>
                  </span>
                </div>
                <div className="flex justify-evenly w-5/6 my-4 space-x-3 lg:mt-6">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <FaTwitter />
                  </button>

                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    <BsFillBookmarkPlusFill />
                  </button>

                  <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
                    <AiOutlineMail />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </ScrollableFeed>
    </div>
  );
};

export default Feed;
