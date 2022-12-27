export const queryToString = (
  query: string | string[] | undefined,
  join?: string
) => {
  if (Array.isArray(query)) return query.join(join || "");
  if (query) return query;
  return "";
};
