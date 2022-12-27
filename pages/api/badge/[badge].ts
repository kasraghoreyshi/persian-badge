import { NextApiRequest, NextApiResponse } from "next";
import { BadgeOptions } from "../../../badge-builder";
import { queryToString } from "../../../lib/query-to-string";

import { withBadge } from "../../../lib/with-badge";

const namedBadge = (
  req: NextApiRequest,
  res: NextApiResponse
): BadgeOptions => {
  const stringifedBadge = queryToString(req.query.badge);

  const splittedBadge = stringifedBadge.split("-");

  let color, label, status;

  if (splittedBadge.length <= 2) {
    status = splittedBadge[0];
    color = splittedBadge[1];
  } else {
    label = splittedBadge[0];
    status = splittedBadge[1];
    color = splittedBadge[2];
  }

  return {
    color,
    status,
    label,
    icon: req.query.logo?.toString(),
  };
};

export default withBadge(namedBadge);
