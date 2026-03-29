import { ShadowBox } from "./ShadowBox";
import Image from "next/image";

type PhotoProps = {
  src: string;
  alt: string;
};

export function Photo({ src, alt }: PhotoProps) {
  return (
    <ShadowBox className="w-[140px] md:w-[200px] bg-background">
      <Image
        className="max-h-[140px] max-w-[140px] rounded-xl object-cover md:max-h-[200px] md:max-w-[200px]"
        src={src}
        alt={alt}
        width={200}
        height={200}
        loading="eager"
      />
    </ShadowBox>
  );
}
