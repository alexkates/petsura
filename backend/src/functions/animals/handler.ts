import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { auth } from "@libs/petfinder/auth";
import { Animal } from "@models/Animal";
import axios from "axios";

import schema from "./schema";

type GetAnimalsResponse = {
  animals: Animal[];
};

const animals: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { access_token } = await auth();

  const { body } = event;
  const { type } = body;

  const { data } = await axios.get("https://api.petfinder.com/v2/animals", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params: {
      type,
    },
  });

  return formatJSONResponse(data as GetAnimalsResponse);
};

export const main = middyfy(animals);
