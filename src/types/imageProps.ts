import { FileMeta } from "components/editor/imageUploadEdit";

export type ImageVariant = {
  width: number;
  height: number;
  url: string;
};

export type ImageProps = {
  url: string;
  altText?: string;
  variants?: ImageVariant[];
};

export type ArticleProps = {
  images: {
    identifier: string;
    data: ImageProps | File;
  }[];
  markdown: string;
  identifier: string;
  title: string;
};

export const isImageUploaded = (d: FileMeta["data"]): d is ImageProps => {
  return "url" in d;
};
