import { IImage } from "@/libs";

export interface IBannerNavProps {
  currentImage: IImage;
  nextImage: IImage;
  progressPercent: number;
  isButtonHovered: boolean;
  handleNext: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  imageSelected: number;
  totalImages: number;
}
