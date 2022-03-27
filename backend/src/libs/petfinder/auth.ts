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
      client_secret: process.env.NEXT_PUBLIC_PETFINDER_CLIENT_SECRET,
    }
  );

  return data as AuthResponse;
};
