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

export type ArticleProps = {
  images: Image[];
  markdown: string;
  identifier: string;
  title: string;
};
