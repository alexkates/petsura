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

const animals: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const { access_token } = await auth();

  const { data } = await axios.get("https://api.petfinder.com/v2/animals", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params: {
      type: "cat",
    },
  });

  return formatJSONResponse(data as GetAnimalsResponse);
};

export const main = middyfy(animals);
