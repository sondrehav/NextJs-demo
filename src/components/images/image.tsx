import { ComponentProps, FC } from "react";
import { ImageVariant, Image as ImageProps } from "types/image";
import { withImageContext } from "components/images/imagePreviewProvider";

export type Props = ComponentProps<"img"> & ImageProps;

export const Image: FC<Props> = ({
  url,
  altText,
  variants,
  sizes,
  ...rest
}) => {
  const srcsets = (variants: ImageVariant[]) =>
    variants.map((src) => `${src.url} ${src.width}w`).join(", ");
  const variantsByType: Record<string, ImageVariant[]> =
    variants?.reduce<Record<string, ImageVariant[]>>((a, v) => {
      const ending = v.url.split(".").reverse()[0];
      if (ending in a) {
        return { ...a, [ending]: [...a[ending], v] };
      }
      return { ...a, [ending]: [v] };
    }, {}) ?? {};

  const order = ["webp", "avif", "jpg"];
  const modP = (num: number, n: number) => ((num % n) + n) % n;

  return (
    <picture {...rest}>
      {Object.entries(variantsByType)
        .sort(
          ([a], [b]) =>
            modP(order.indexOf(a), order.length + 1) -
            modP(order.indexOf(b), order.length + 1)
        )
        .map(([k, v]) => (
          <source
            key={k}
            srcSet={srcsets(v)}
            sizes={sizes}
            type={`image/${k}`}
          />
        ))}
      <img {...rest} src={url} alt={altText ?? rest.alt} />
    </picture>
  );
};
