import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { FaBirthdayCake, FaCat, FaDog } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
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
    return (
      <div className="w-full h-screen flex align-middle items-center justify-center">
        <svg
          role="status"
          className="w-32 h-32 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
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
