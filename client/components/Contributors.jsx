import { Avatar, HStack, Link, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { getContributors } from "../helpers/network";

export default function Contributors() {
  const [contributorsList, setContributorsList] = useState([]);
  useEffect(() => {
    async function retrieveContributors() {
      const contributors = await getContributors();
      setContributorsList(contributors);
    }
    retrieveContributors();

    return () => setContributorsList([]);
  }, []);

  const contributorWrapItems = contributorsList?.map(
    ({ login, avatar_url: avatarUrl, html_url: htmlUrl }) => (
      <Tooltip key={login} label={login} aria-label={login} placement="top">
        <Link href={htmlUrl} isExternal aria-label={`Open link to ${htmlUrl}`}>
          <Avatar size="xs" name={login} data-testid={login} src={avatarUrl} />
        </Link>
      </Tooltip>
    )
  );

  return (
    <HStack justify="center" spacing={1} data-testid="contributors">
      {contributorWrapItems}
    </HStack>
  );
}
