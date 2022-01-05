import { HTMLProps, useEffect, useState } from "react";
import { remark } from "remark";
import { Root } from "remark-parse/lib";
import Markdown from "components/article/markdownRender";

const MarkdownPreview = ({
  content,
  className,
}: { content: string } & HTMLProps<HTMLDivElement>) => {
  const [result, setResult] = useState<null | Root>(null);
  useEffect(() => {
    const res = remark().parse(content);
    setResult(res);
  }, [content]);
  if (!result) return null;
  return <Markdown {...result} />;
};

export default MarkdownPreview;
