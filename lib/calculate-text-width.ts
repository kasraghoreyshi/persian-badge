//* DEPRECATED

import charWidthTable from "./widths-verdana-110.json";
export const calculateTextWidth = (text: string) => {
  const fallbackWidth = charWidthTable[64];

  let total = 0;
  let i = text.length;
  while (i--) {
    total += charWidthTable[text.charCodeAt(i)] || fallbackWidth;
  }
  return total;
};
