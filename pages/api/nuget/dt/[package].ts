import { NextApiRequest, NextApiResponse } from "next";
import { convertDigits } from "persian-helpers";

import { BadgeOptions } from "../../../../badge-builder";
import { queryToString } from "../../../../lib/query-to-string";
import { reverse } from "../../../../lib/reverse";
import { withBadge } from "../../../../lib/with-badge";
import { NugetHelper } from "../../../../utils/request-util/nuget";

const githubRepoStarsCount = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<BadgeOptions> => {
  const packageName = queryToString(req.query.package);
  let downloads;
  const nuget = new NugetHelper();
  try {
    downloads = await nuget.getPackageDownloads(packageName);
  } catch (e) {}

  return {
    color: "green",
    status: reverse(convertDigits(downloads || "0")),
    label: "دانلود ها",
  };
};

export default withBadge(githubRepoStarsCount);
