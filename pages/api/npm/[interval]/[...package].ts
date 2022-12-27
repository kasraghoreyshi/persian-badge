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
  const interval = queryToString(req.query.interval);

  let packageDownloads;

  try {
    packageDownloads = (
      await axios.get(
        `https://api.npmjs.org/downloads/point/${interval}/${packageName}`
      )
    ).data;
  } catch (e) {}

  const packageDownloadsStatus = packageDownloads?.downloads || "404";

  return {
    color: "green",
    status: `${reverse(convertDigits(packageDownloadsStatus))} / هفته پیش`,
    label: "دانلود ها",
  };
};

export default withBadge(namedBadge);
