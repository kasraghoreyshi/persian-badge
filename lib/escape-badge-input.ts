export const escapeBadgeInput = (input?: string) => {
  if (!input) return input;
  return input.replace("<", "&#x3C;").replace(">", "&#x3e;");
};
