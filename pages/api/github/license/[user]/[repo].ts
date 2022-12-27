import { NextApiRequest, NextApiResponse } from "next";

import { BadgeOptions } from "../../../../../badge-builder";
import { queryToString } from "../../../../../lib/query-to-string";
import { withBadge } from "../../../../../lib/with-badge";
import { GitHubHelper } from "../../../../../utils/request-util/github";

const githubRepoStarsCount = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<BadgeOptions> => {
  const user = queryToString(req.query.user);
  const repo = queryToString(req.query.repo);
  let repoInformation;
  const github = new GitHubHelper();
  try {
    repoInformation = await github.getRepository(user, repo);
  } catch (e) {}
  const licenseName = repoInformation?.license?.name || "بدون لیسانس";

  return {
    color: "yellowgreen",
    status: licenseName,
    label: "لیسانس",
    icon: "github",
    logoColor: "white",
    rtlStatus: false,
  };
};

export default withBadge(githubRepoStarsCount);
