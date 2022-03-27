import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { FaBirthdayCake, FaCat, FaDog } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { AiOutlineMail, AiOutlineReload } from "react-icons/ai";
import { FeedResponse } from "models/FeedResponse";

const FeedResponse: NextPage = () => {
  const { data, loading, fetchMore } = useQuery<FeedResponse>(
    gql`
      query Feed($offset: Int, $limit: Int) {
        feed(offset: $offset, limit: $limit) {
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
          url
        }
      }
    `,
    {
      variables: {
        offset: 0,
        limit: 25,
      },
    }
  );

  if (loading) {
    return null;
  }

  return (
    <>
      <header className="bg-gray-800 text-white p-4 w-full flex flex-col">
        <div className="flex justify-center text-lg items-center">
          <FaCat />
          <h1 className="mx-4 text-2xl">Petsura</h1>
          <FaDog />
        </div>
        <span className="flex justify-center text-sm italic font-extralight items-center">
          Finding forever homes
        </span>
      </header>
      <div className="flex-col flex items-center mb-4 sm:my-8">
        {data?.feed
          .filter((animal) => animal.photos.length > 0)
          .filter((animal) => animal.contact.email)
          .filter((animal) => animal.url)
          .map((animal, i) => {
            const tweetText = `OMG someone needs to adopt ${animal.name}!`;

            const emailSubject = `I'm interested in adopting ${animal.name}!`;
            const emailBody = `Hi, I came across ${animal.name} at ${animal.url} and I'm interested in adopting! Looking forward to hearing from you soon!`;

            return (
              <div
                key={i}
                className="flex flex-col items-center w-96 h-auto rounded-md border bg-gray-800 text-white shadow-lg mb-4"
              >
                <img
                  className="w-full h-96 object-cover"
                  src={animal.photos[0].full}
                  alt={animal.name}
                />
                <h2 className="my-4 text-3xl font-medium">{animal.name}</h2>
                <div className="flex w-5/6 justify-evenly">
                  <span className="flex items-center text-sm text-gray-50">
                    <FaBirthdayCake />
                    <span className="pl-2">{animal.age?.toLowerCase()}</span>
                  </span>
                  <span className="flex items-center text-sm text-gray-50">
                    <MdQueryStats />
                    <span className="pl-2">{animal.status?.toLowerCase()}</span>
                  </span>
                  <span className="flex items-center text-sm text-gray-50">
                    <AiOutlineColumnWidth />
                    <span className="pl-2">{animal.size?.toLowerCase()}</span>
                  </span>
                </div>
                <div className="flex justify-evenly w-5/6 my-8 border-t-2 pt-8">
                  <a
                    href={`https://twitter.com/share?ref_src=twsrc%5Etfw&text=${tweetText}&url=${animal.url}&hashtags=petsura`}
                    className="text-3xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    target={`_blank`}
                  >
                    <FaTwitter />
                  </a>

                  <a
                    href={`mailto:${animal.contact?.email}?subject=${emailSubject}&body=${emailBody}`}
                    className="text-3xl bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                    target={`_blank`}
                  >
                    <AiOutlineMail />
                  </a>
                </div>
              </div>
            );
          })}
        <button
          className="w-96 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
          onClick={() =>
            fetchMore({
              variables: {
                offset: data?.feed.length,
              },
            })
          }
        >
          <div className="flex items-center justify-evenly text-xl">
            <FaCat />
            <span>Get More Fluffs</span>
            <FaDog />
          </div>
        </button>
      </div>
    </>
  );
};

export default FeedResponse;
