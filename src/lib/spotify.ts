import SpotifyWebApi from "spotify-web-api-node";

// credentials are optional
export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SHOPIFY_CLIENT_ID as string,
  clientSecret: process.env.CLIENT_SECRET as string,
  redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/spotify`,
});
