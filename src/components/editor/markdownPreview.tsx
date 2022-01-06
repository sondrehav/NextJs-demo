import { HTMLProps, useEffect, useState } from "react";
import { remark } from "remark";
import { Root } from "remark-parse/lib";
import Markdown from "components/article/markdownRender";
import { useFormContext, useWatch, WatchObserver } from "react-hook-form";
import { ArticleProps } from "types/image";

const MarkdownPreview = () => {
  const markdown = useWatch({ name: "markdown", defaultValue: "" });
  const result = remark().parse(markdown);

  if (!result) return null;
  return <Markdown {...result} />;
};

export default MarkdownPreview;
