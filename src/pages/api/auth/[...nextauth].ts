import { spotifyApi } from "@/lib/spotify";
import NextAuth, { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      authorization: {
        params: {
          scope:
            "user-read-email,user-library-read,user-top-read,user-read-recently-played,playlist-read-private",
        },
      },
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ account, token, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        spotifyApi.setAccessToken(token.accessToken);
        token.id = profile?.sub;
      }
      console.log({ account, token, profile });
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken as string;
      // @ts-ignore
      // session.sub = token.sub;
      return session;
    },
  },
};
export default NextAuth(authOptions);
