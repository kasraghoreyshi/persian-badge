import * as icons from "simple-icons";

export const findIcon = (slug: string): keyof typeof icons => {
  return Object.keys(icons).find(
    (where) => where.toLowerCase() === `si${slug.toLowerCase()}`
  ) as any;
};
