import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { convertDigits } from "persian-helpers";
import { BadgeOptions } from "../../../badge-builder";
import { queryToString } from "../../../lib/query-to-string";
import { reverse } from "../../../lib/reverse";
import { withBadge } from "../../../lib/with-badge";

const githubRepoStarsCount = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<BadgeOptions> => {
  const guildId = queryToString(req.query.guildId);
  let guild;
  try {
    guild = (
      await axios.get(
        `https://discordapp.com/api/guilds/${guildId}/widget.json`,
        {
          headers: {
            "Accept-Encoding": "*",
          },
        }
      )
    ).data;
  } catch (e) {}

  const guildPresenceCount = guild?.presence_count || "404";

  return {
    color: "green",
    status: `${reverse(convertDigits(guildPresenceCount))}`,
    label: "دیسکورد",
    icon: "discord",
  };
};

export default withBadge(githubRepoStarsCount);
