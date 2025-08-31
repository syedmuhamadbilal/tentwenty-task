import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
  width?: string;
  height?: string;
  fill?: string;
  onClick?: () => void;
};
