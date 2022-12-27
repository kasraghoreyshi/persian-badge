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

  let contributors: any[] = [];

  let hasMore = false;

  const github = new GitHubHelper();

  const getContributors = async (page = 1) => {
    try {
      const newContributors = await github.getRepositoryContributors(
        user,
        repo,
        { page, perPage: 100 }
      );

      contributors.push(newContributors);
      if (newContributors?.length) {
        if (page >= 10) return (hasMore = true);
        await getContributors(page + 1);
      }
    } catch (e) {}
  };

  await getContributors();

  contributors = contributors.flat();

  const contributorsCount = contributors.length;

  return {
    color: "green",
    status: `${reverse(convertDigits(contributorsCount))}${hasMore ? "+" : ""}`,
    label: "مشارکت کنندگان",
    icon: "github",
    logoColor: "white",
  };
};

export default withBadge(githubRepoStarsCount);
