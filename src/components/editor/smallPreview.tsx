import { ComponentProps, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Image as ImageProps, isImageUploaded } from "types/image";
import { Image as ImageComponent } from "components/images/image";
import { FileMeta } from "components/editor/imageUploadEdit";

const SmallPreview = ({
  image,
  ...imageProps
}: { image: ImageProps | File } & ComponentProps<"img">) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isImageUploaded(image)) {
      setUrl(image.url);
      return;
    }
    const url = URL.createObjectURL(image);
    setUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [image]);

  if (isImageUploaded(image)) {
    return <ImageComponent {...imageProps} {...image} />;
  }

  if (!url) return null;
  return <ImageComponent {...imageProps} url={url} />;
};

export default SmallPreview;
