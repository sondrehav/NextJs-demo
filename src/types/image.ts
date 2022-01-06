import { FileMeta } from "components/editor/imageUploadEdit";

export type ImageVariant = {
  width: number;
  height: number;
  url: string;
};

export type Image = {
  url: string;
  altText?: string;
  variants?: ImageVariant[];
};

// export type ArticleProps = {
//   images: Image[];
//   markdown: string;
//   identifier: string;
//   title: string;
// };

export type ArticleProps = {
  images: {
    identifier: string;
    data: Image | File;
  }[];
  markdown: string;
  identifier: string;
  title: string;
};

export const isImageUploaded = (d: FileMeta["data"]): d is Image => {
  return "url" in d;
};
