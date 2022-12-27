import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { convertDigits } from "persian-helpers";
import { BadgeOptions } from "../../../../badge-builder";
import { queryToString } from "../../../../lib/query-to-string";
import { reverse } from "../../../../lib/reverse";
import { withBadge } from "../../../../lib/with-badge";

const namedBadge = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<BadgeOptions> => {
  const packageName = queryToString(req.query.package, "/");

  let packageInformation;

  try {
    packageInformation = (
      await axios.get(`https://registry.npmjs.org/${packageName}`)
    ).data;
  } catch (e) {}

  const packageDownloadsStatus =
    packageInformation?.["dist-tags"]?.latest || "404";

  return {
    color: "blue",
    status: `ورژن ${reverse(convertDigits(packageDownloadsStatus))}`,
    label: "NPM",
  };
};

export default withBadge(namedBadge);
