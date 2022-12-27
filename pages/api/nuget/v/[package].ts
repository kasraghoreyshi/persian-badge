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
  let versions = [];
  const nuget = new NugetHelper();
  try {
    versions = await nuget.getPackageVersions(packageName);
  } catch (e) {}
  console.log(versions);
  const latestVersion = versions[versions.length - 1] || "404";

  return {
    color: "blue",
    status: `ورژن ${reverse(convertDigits(latestVersion))}`,
    label: "nuget",
    icon: "nuget",
    logoColor: "white",
  };
};

export default withBadge(githubRepoStarsCount);
