import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";
import { convertDigits } from "persian-helpers";
import { BadgeOptions } from "../../badge-builder";
import { queryToString } from "../../lib/query-to-string";
import { withBadge } from "../../lib/with-badge";

const githubRepoStarsCount = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<BadgeOptions> => {
  const packageName = queryToString(req.query.shields, "/");

  const thing = (
    await axios.get(`https://img.shields.io/${packageName}`, {
      headers: {
        "Accept-Encoding": "*",
      },
    })
  ).data;

  const root = parse(thing);

  const texts = root.querySelectorAll("text");
  const rects = root.querySelectorAll("rect");
  return {
    color: rects[2].attributes.fill.split("#")[1],
    status: convertDigits(texts[2].innerText.replace("/month", "/ماه")),
    label: texts[0].innerText,
    rtlStatus: false,
  };
};

export default withBadge(githubRepoStarsCount);
