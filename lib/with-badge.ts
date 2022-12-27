import { NextApiRequest, NextApiResponse } from "next";
import { createBadge } from "../badge-builder";
import { queryToString } from "./query-to-string";

export const withBadge = (fc: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Content-Type", "image/svg+xml");
    const badge = await fc(req, res);
    const label = queryToString(req.query.label);
    const status = queryToString(req.query.status);
    const color = queryToString(req.query.color);
    const logo = queryToString(req.query.logo);
    const logoColor = queryToString(req.query.logoColor);
    const labelColor = queryToString(req.query.labelColor);

    const userOptions: any = {};

    const enterUserOptions = (...inputs: { name: string; value: string }[]) => {
      for (const input of inputs) {
        if (input.value && input.value.length)
          userOptions[input.name] = input.value;
      }
    };

    enterUserOptions(
      { name: "label", value: label },
      { name: "labelColor", value: labelColor },
      { name: "status", value: status },
      { name: "logoColor", value: logoColor },
      { name: "color", value: color },
      { name: "icon", value: logo }
    );

    if (userOptions["status"]) userOptions["rtlStatus"] = true;

    res.send(
      createBadge({
        style: req.query.style,
        scale: req.query.scale ? parseFloat(queryToString(req.query.scale)) : 1,
        ...badge,
        ...userOptions,
      })
    );
  };
};
