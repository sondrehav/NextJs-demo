import { Image as ImageComponent } from "components/images/image";
import { ImageProps as ImageProps } from "types/imageProps";
import { withImageContext } from "components/images/imagePreviewProvider";
import { HTMLProps } from "react";
import classNames from "classnames";

const SingleImage = withImageContext<ImageProps>(({ cdn, ...image }) => {
  const imageProps = cdn?.[image.url] ?? image;
  return (
    <ImageComponent
      className={
        "overflow-hidden max-h-96 rounded-xl shadow-lg lg:mx-auto object-cover"
      }
      sizes={"(min-width: 1920px) 90vw, 700px"}
      {...imageProps}
    />
  );
});

type Props = ImageProps & { caption?: string };

export const ImageView = ({ url, altText, variants, caption }: Props) => {
  const image = { url, altText, variants };
  return (
    <div className={classNames("my-4 lg:mx-auto lg:my-8")}>
      <SingleImage {...image} />
      {caption && (
        <p className={"my-4 text-gray-500 lg:text-center"}>
          <i>{caption}</i>
        </p>
      )}
    </div>
  );
};

export default ImageView;
