import { HTMLProps, PropsWithChildren, useEffect, useState } from "react";
import { remark } from "remark";
import { Root } from "remark-parse/lib";
import Markdown from "components/article/markdownRender";
import { useFormContext, useWatch, WatchObserver } from "react-hook-form";
import { ArticleProps, isImageUploaded } from "types/imageProps";
import { ImageProvider } from "components/images/imagePreviewProvider";
import { ImageProps as ImageProps } from "types/imageProps";

const reduceImages = (images: ArticleProps["images"]) =>
  images.reduce((a, v) => {
    if (isImageUploaded(v.data)) {
      return {
        ...a,
        [v.identifier]: v.data,
      };
    }
    return {
      ...a,
      [v.identifier]: {
        url: URL.createObjectURL(v.data),
      },
    };
  }, {});

const ImagesWrapped = ({ children }: PropsWithChildren<{}>) => {
  const images: ArticleProps["images"] = useWatch({
    name: "images",
    defaultValue: [],
  });
  const [cdn, setCdn] = useState({});
  useEffect(() => {
    const r: Record<string, ImageProps> = reduceImages(images);
    setCdn(r);
    return () => {
      images.forEach((image) => {
        if (!isImageUploaded(image.data)) {
          URL.revokeObjectURL(r[image.identifier]!.url);
        }
      });
    };
  }, [images]);
  return (
    <>
      <ImageProvider cdn={cdn}>{children}</ImageProvider>
    </>
  );
};

const MarkdownPreview = () => {
  const markdown = useWatch({ name: "markdown", defaultValue: "" });
  const result = remark().parse(markdown);

  if (!result) return null;
  return <Markdown {...result} />;
};

const Thingy = () => (
  <ImagesWrapped>
    <MarkdownPreview />
  </ImagesWrapped>
);
export default Thingy;
