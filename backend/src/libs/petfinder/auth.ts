import axios from "axios";

type AuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export const auth = async (): Promise<AuthResponse> => {
  const { data } = await axios.post(
    "https://api.petfinder.com/v2/oauth2/token",
    {
      grant_type: "client_credentials",
      client_id: "91rAj3n32N8argY63PeBvK8GdLCWaxHaLhCVCue08HMydjoyag",
      client_secret: "Dh8LZ0cO7jE0yV8sNSTYsv47Aq5ohRigNwh9wR5C",
    }
  );

  return data as AuthResponse;
};
