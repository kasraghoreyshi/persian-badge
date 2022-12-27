export const isHexColor = (hex: string | undefined) => {
  return (
    typeof hex === "string" && hex.length === 6 && !isNaN(Number("0x" + hex))
  );
};
