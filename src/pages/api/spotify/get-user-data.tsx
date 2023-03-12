import { spotifyApi } from "@/lib/spotify";
import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const getUserData: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    try {
      spotifyApi.setAccessToken(session.accessToken);
      const data = await spotifyApi.getMyTopTracks();
      res.send(data.body);
    } catch (error) {
      console.log("Something went wrong!", error);
      res.statusCode = 500;
      res.send("oops");
    }
  } else {
    res.send("login fool");
  }
};

export default getUserData;
