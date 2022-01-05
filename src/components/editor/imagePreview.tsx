import { withImageContext } from "components/images/imagePreviewProvider";
import { Image as ImageComponent } from "components/images/image";

const ImagePreview = withImageContext<{ url: string }>(({ cdn, ...image }) => {
  const imageProps = cdn?.[image.url] ?? image;
  return (
    <ImageComponent
      className={"w-32 h-24 rounded-lg shadow m-2"}
      {...imageProps}
    />
  );
});

export default ImagePreview;
