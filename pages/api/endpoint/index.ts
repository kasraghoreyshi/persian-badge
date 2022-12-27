import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { BadgeOptions } from "../../../badge-builder";
import { queryToString } from "../../../lib/query-to-string";

import { withBadge } from "../../../lib/with-badge";

const namedBadge = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<BadgeOptions> => {
  const url = queryToString(req.query.url);
  const labelKey = queryToString(req.query.labelKey);
  const statusKey = queryToString(req.query.statusKey);
  let endpointResponse;
  try {
    endpointResponse = (await axios.get(url)).data;
    if (Array.isArray(endpointResponse)) endpointResponse = endpointResponse[0];
  } catch (e) {}

  console.log(url);

  const label = labelKey.length
    ? endpointResponse?.[labelKey]
    : endpointResponse?.["label"];

  const status = statusKey.length
    ? endpointResponse?.[statusKey]
    : endpointResponse?.["status"];

  const color = endpointResponse?.["color"];

  return {
    status: status || "نامشخص",
    label: label || "نامشخص",
    color,
  };
};

export default withBadge(namedBadge);
