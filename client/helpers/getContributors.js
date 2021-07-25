import axios from "axios";

export default async function getContributors() {
  const response = await axios.get(
    "https://api.github.com/repos/jcserv/ulinks/contributors",
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    }
  );
  return response.data;
}
