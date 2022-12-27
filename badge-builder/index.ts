import path from "path";
//@ts-ignore
import { RTLUnicodeNormalizer } from "rtl-unicode-normalizer";
import * as icons from "simple-icons";
//@ts-ignore
import TextToSVG from "text-to-svg";
import { colors } from "../data/colors";
import { escapeBadgeInput } from "../lib/escape-badge-input";
import { findIcon } from "../lib/find-icon";

export type BadgeStyles =
  | "plastic"
  | "flat"
  | "flat-square"
  | "for-the-badge"
  | "social";

export interface BadgeOptions {
  label?: string;
  icon?: string;
  color?: string;
  status: string;
  style?: BadgeStyles;
  scale?: number;
  logoColor?: string;
  rtlStatus?: boolean;
  labelColor?: string;
}

export const createBadge = ({
  color: inputColor = "lightgray",
  icon: inputIcon,
  label: inputLabel,
  status: inputStatus,
  style = "flat",
  scale: inputScale = 1,
  logoColor: inputLogoColor,
  rtlStatus = true,
  labelColor: inputLabelColor,
}: BadgeOptions) => {
  const getColor = (input: string | undefined, returnUndefined?: boolean) => {
    if (input === undefined && returnUndefined) return undefined;

    const colorInColorNames = colors.find((where) => where.name === input);

    const color = colorInColorNames?.hex || `#${escapeBadgeInput(input)}`;

    return color;
  };

  const color = getColor(inputColor);

  const logoColor = getColor(inputLogoColor);

  const labelColor = getColor(inputLabelColor, true);

  const label = inputLabel
    ? escapeBadgeInput(inputLabel.replace("_", " "))
    : undefined;

  const status = escapeBadgeInput(inputStatus);

  const iconWidth = 130;
  const icon = inputIcon;
  const iconComponent = icons[findIcon(icon?.toString() || "")];

  const iconSpanWidth = iconComponent
    ? label?.length
      ? iconWidth + 30
      : iconWidth - 18
    : 0;
  const scale = Math.min(inputScale, 10);

  const textToSVG = TextToSVG.loadSync(
    path.resolve("./fonts/Vazirmatn-Regular.ttf")
  );

  const labelMetrics = label
    ? textToSVG.getMetrics(new RTLUnicodeNormalizer(label).toString(), {
        fontSize: 110,
        y: 130,
        fill: "#fff",
      })
    : undefined;
  const statusMetrics = textToSVG.getMetrics(
    rtlStatus ? new RTLUnicodeNormalizer(status).toString() : status,
    {
      fontSize: 110,
      y: 130,
      fill: "#fff",
    }
  );
  const labelTextWidth = labelMetrics?.width || 0;

  const statusTextWidth = statusMetrics.width;

  const labelTextStart = statusTextWidth + 150 + (style === "social" ? 50 : 0);

  const labelSvg = label
    ? textToSVG.getSVG(new RTLUnicodeNormalizer(label).toString(), {
        fontSize: 110,
        y: 130,
        fill: "#fff",
      })
    : "";

  const statusSvg = textToSVG.getSVG(
    rtlStatus ? new RTLUnicodeNormalizer(status).toString() : status,
    {
      fontSize: 110,
      y: 130,
      fill: "#fff",
    }
  );

  const labelRectWidth = labelTextWidth + 100 + iconSpanWidth;
  const statusRectWidth = statusTextWidth + 100 + (!label ? iconSpanWidth : 0);

  const width =
    (label ? labelRectWidth : 0) +
    statusRectWidth +
    (style === "social" ? 50 : 0);

  const xlink = icon ? ' xmlns:xlink="http://www.w3.org/1999/xlink"' : "";

  return `<svg width="${(scale * width) / 10}" height="${
    scale * 20
  }" viewBox="0 0 ${width} 200" xmlns="http://www.w3.org/2000/svg"${xlink} role="img" aria-label="${
    label || status
  }">
  <defs>
  <clipPath id="round-corner-right">
      <rect x="${statusRectWidth - 60}" width="${
    labelRectWidth + 60
  }" height="200" rx="30" ry="30"/>
   </clipPath>
</defs>
<defs>
<clipPath id="round-corner-left">
    <rect width="${statusRectWidth + 40}" height="200" rx="30" ry="30"/>
 </clipPath>
</defs>
${
  style === "plastic"
    ? `<linearGradient xmlns="http://www.w3.org/2000/svg" id="s" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".1" stop-color="#aaa" stop-opacity=".1"/><stop offset=".9" stop-color="#000" stop-opacity=".3"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient>`
    : ""
}
  <title>${label || status}</title>
  <g>
    <rect fill="${label ? labelColor || "#334155" : color}" ${
    label && style !== "flat-square" && style !== "social"
      ? `clip-path="url(#round-corner-right)"`
      : ""
  } x="${
    label ? (style === "social" ? statusRectWidth + 50 : statusRectWidth) : 0
  }" ${!label || style === "social" ? `rx="30"` : ""} width="${
    label ? labelRectWidth : statusTextWidth + 50 + iconWidth + 35
  }" height="200"/>
  ${
    label
      ? `<rect fill="${color}" ${
          style === "flat-square" ? "" : `clip-path="url(#round-corner-left)"`
        } width="${statusRectWidth}" height="200"/>`
      : ""
  }
  ${
    style === "plastic"
      ? `<rect fill="url(#s)" rx="30" width="${width}" height="200"/>`
      : ""
  }
  </g>
  ${
    style === "plastic"
      ? labelSvg.replace(
          "<svg",
          `<svg x="${
            labelTextStart + 10
          }" y="10" transform="scale(.1)" fill="black" opacity="0.3"`
        )
      : ""
  }
  ${labelSvg.replace("<svg", `<svg x="${labelTextStart}" fill="white"`)}
  ${
    style === "plastic"
      ? statusSvg.replace(
          "<svg",
          `<svg x="${
            label ? 50 + 10 : 25 + 10
          }" y="10" transform="scale(.1)" fill="black" opacity="0.3"`
        )
      : ""
  }
  ${statusSvg.replace("<svg", `<svg x="${label ? 50 : 25}" fill="white"`)}

 ${
   iconComponent
     ? `<svg x="${
         label
           ? statusRectWidth +
             labelTextWidth +
             iconWidth -
             35 +
             (style === "social" ? 50 : 0)
           : iconWidth + statusTextWidth - 80
       }" role="img" fill="${
         inputLogoColor ? logoColor : `#${iconComponent.hex}`
       }" viewBox="0 0 24 24" width="130" height="130" y="35" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path d="${
         iconComponent.path
       }" /></svg>`
     : ""
 }

</svg>`;
};
