import { NextApiRequest, NextApiResponse } from "next";

import { convertDigits } from "persian-helpers";
import { BadgeOptions } from "../../../../../badge-builder";
import { queryToString } from "../../../../../lib/query-to-string";
import { reverse } from "../../../../../lib/reverse";
import { withBadge } from "../../../../../lib/with-badge";
import { GitHubHelper } from "../../../../../utils/request-util/github";

const githubRepoStarsCount = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<BadgeOptions> => {
  const user = queryToString(req.query.user);

  const repo = queryToString(req.query.repo);

  const github = new GitHubHelper();

  let repoInformation;

  try {
    repoInformation = await github.getRepository(user, repo);
  } catch (e) {}

  const repoStargazersCount = repoInformation?.stargazers_count || "404";

  return {
    color: "blue",
    status: `${reverse(convertDigits(repoStargazersCount))}`,
    label: "ستاره ها",
    icon: "github",
    logoColor: "white",
  };
};

export default withBadge(githubRepoStarsCount);
