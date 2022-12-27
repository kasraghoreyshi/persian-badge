import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";
import { convertDigits } from "persian-helpers";
import { BadgeOptions } from "../../badge-builder";
import { generateQueryParams } from "../../lib/generate-query-params";
import { queryToString } from "../../lib/query-to-string";
import { withBadge } from "../../lib/with-badge";

const githubRepoStarsCount = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<BadgeOptions> => {
  const packageName = queryToString(req.query.shields, "/");

  const thing = (
    await axios.get(
      `https://img.shields.io/${packageName}${generateQueryParams(req.query, [
        "shields",
        "style",
      ])}`,
      {
        headers: {
          "Accept-Encoding": "*",
        },
      }
    )
  ).data;
  console.log(
    `https://img.shields.io/${packageName}${generateQueryParams(req.query, [
      "shields",
    ])}`
  );
  const root = parse(thing);

  const texts = root.querySelectorAll("text");
  const rects = root.querySelectorAll("rect");

  console.log(texts[0].innerText);
  return {
    color: rects[2]?.attributes?.fill?.split("#")?.[1] || "lightgray",
    status: convertDigits(
      (texts[2]?.innerText || texts[0].innerText).replace("/month", "/ماه")
    ),
    label: undefined,
    rtlStatus: false,
  };
};

export default withBadge(githubRepoStarsCount);
