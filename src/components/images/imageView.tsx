import { Image as ImageComponent } from "components/images/image";
import { Image as ImageProps } from "types/image";
import { withImageContext } from "components/images/imagePreviewProvider";

const SingleImage = withImageContext<ImageProps>(({ cdn, ...image }) => {
  const imageProps = cdn?.[image.url] ?? image;
  console.log(imageProps, cdn);
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

const ImageView = (image: Props) => {
  return (
    <div className={"my-4 lg:mx-auto lg:my-8"}>
      <SingleImage {...image} />
      {image.caption && (
        <p className={"my-4 text-gray-500 lg:text-center"}>
          <i>{image.caption}</i>
        </p>
      )}
    </div>
  );
};

export default ImageView;
