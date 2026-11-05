import type { ImgHTMLAttributes } from "react";
import { IMAGES, type ImageName } from "../../data/images.generated";

export interface ResponsiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height"> {
  name: ImageName;
  /** Required: describe the image, or pass "" for decorative images. */
  alt: string;
  /** Rendered width hint for the browser, e.g. "(max-width: 700px) 100vw, 33vw". */
  sizes: string;
  /** Above-the-fold images: "eager" + fetchPriority="high". Default lazy. */
  loading?: "lazy" | "eager";
}

const url = (name: string, width: number, format: string) => `/images/${name}-${width}.${format}`;

/**
 * <picture> with AVIF + WebP sources at every generated width
 * (scripts/optimize-images.mjs). Intrinsic width/height are always set so the
 * browser reserves space before the file arrives (no layout shift).
 */
export function ResponsiveImage({ name, alt, sizes, loading = "lazy", decoding = "async", ...img }: ResponsiveImageProps) {
  const meta = IMAGES[name];
  const widths = meta.widths as readonly number[];
  const formats = meta.formats as readonly string[];
  const largest = widths[widths.length - 1] ?? meta.width;
  const fallbackFormat = formats.includes("webp") ? "webp" : (formats[0] ?? "webp");
  const fallbackWidth = widths.find((w) => w >= 800) ?? largest;
  const height = Math.round((meta.height / meta.width) * largest);

  return (
    <picture className="responsive-image">
      {formats
        .filter((format) => format !== fallbackFormat)
        .map((format) => (
          <source
            key={format}
            type={`image/${format}`}
            srcSet={widths.map((w) => `${url(name, w, format)} ${w}w`).join(", ")}
            sizes={sizes}
          />
        ))}
      <img
        src={url(name, fallbackWidth, fallbackFormat)}
        srcSet={widths.map((w) => `${url(name, w, fallbackFormat)} ${w}w`).join(", ")}
        sizes={sizes}
        width={largest}
        height={height}
        alt={alt}
        loading={loading}
        decoding={decoding}
        {...img}
      />
    </picture>
  );
}
