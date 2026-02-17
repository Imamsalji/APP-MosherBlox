import axios from "axios";

const ROBLOX_URL =
  "https://users.roblox.com/v1/usernames/users";

export const getRobloxUser = async (username: string) => {
  const res = await axios.post(ROBLOX_URL, {
    usernames: [username],
    excludeBannedUsers: false
  });

  return res.data;
};
