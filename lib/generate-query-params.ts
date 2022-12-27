export const generateQueryParams = (
  input: { [key in string]: string | string[] | undefined },
  exclude: string[]
) => {
  const keys = Object.keys(input).filter((where) => !exclude.includes(where));
  let result = "";
  if (keys.length) result += "?";
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const value = input[key];
    result += `${key}=${value}`;
    if (index < keys.length - 1) result += "&";
  }
  return result;
};
