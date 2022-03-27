import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { auth } from "@libs/petfinder/auth";
import axios from "axios";
import schema from "./schema";

const feed: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const { body } = event;
    console.log(`Starting to fetch pet feed with ...
      offset: ${body.offset},
      limit: ${body.limit}
    `);

    if (Number.isNaN(body.offset) || Number.isNaN(body.limit)) {
      return formatJSONResponse(
        {
          error: "offset and limit are required",
        },
        400
      );
    }

    const offset = Number(body.offset);
    const limit = Number(body.limit);

    const { access_token } = await auth();
    const { data } = await axios.get("https://api.petfinder.com/v2/animals", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        page: offset / limit + 1,
        limit,
      },
    });

    const { animals } = data;

    return formatJSONResponse(animals);
  } catch (error) {
    console.log(error);
    return formatJSONResponse(error, 500);
  }
};

export const main = middyfy(feed);
