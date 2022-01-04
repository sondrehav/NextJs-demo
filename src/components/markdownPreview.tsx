import { cloneElement, HTMLProps, useEffect, useState } from "react";
import { remark } from "remark";
import { Node, Parent } from "unist";
import classNames from "classnames";
import { Specific } from "unified";
import { Root } from "remark-parse/lib";
import {
  Code,
  Emphasis,
  Heading,
  Image,
  InlineCode,
  List,
  ListItem,
  Paragraph,
  Strong,
  Text,
} from "mdast";
import { createElement } from "react";
import ImageView from "components/imageView";
import { Image as ImageComponent } from "components/image";
import { dracula as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const elementClassNames = {
  h1: "text-3xl my-8",
  h2: "text-2xl my-6",
  h3: "text-1xl my-4",
  h4: "text-lg my-3",
  h5: "text-sm my-2 font-bold",
  h6: "text-sm my-2 font-bold",
};

const isType = <T extends Node>(node: Node, type: T["type"]): node is T =>
  node.type === type;

const Markdown = (node: Node) => {
  if (isType<Heading>(node, "heading")) {
    return (
      <>
        {createElement(
          `h${node.depth}`,
          { className: elementClassNames[`h${node.depth}`] },
          <>
            {node.children.map((child, index) => (
              <Markdown key={index} {...child} />
            ))}
          </>
        )}
      </>
    );
  }
  if (isType<Paragraph>(node, "paragraph")) {
    return (
      <p className={"text-base my-3"}>
        {node.children.map((child, index) => (
          <Markdown key={index} {...child} />
        ))}
      </p>
    );
  }
  if (isType<List>(node, "list")) {
    if (node.ordered) {
      return (
        <ol className={"list-decimal"}>
          {node.children.map((child, index) => (
            <Markdown key={index} {...child} />
          ))}
        </ol>
      );
    }
    return (
      <ul className={"list-disc"}>
        {node.children.map((child, index) => (
          <Markdown key={index} {...child} />
        ))}
      </ul>
    );
  }
  if (isType<ListItem>(node, "listItem")) {
    return (
      <li className={"list-item ml-6"}>
        {node.children
          .filter((child) => isType<Paragraph>(child, "paragraph"))
          .flatMap((child) => (child as Parent).children)
          .map((child, index) => (
            <Markdown key={index} {...child} />
          ))}
      </li>
    );
  }
  if (isType<Text>(node, "text")) {
    return <>{node.value}</>;
  }
  if (isType<Strong>(node, "strong")) {
    return (
      <b>
        {node.children.map((child, index) => (
          <Markdown key={index} {...child} />
        ))}
      </b>
    );
  }
  if (isType<Emphasis>(node, "emphasis")) {
    return (
      <i>
        {node.children.map((child, index) => (
          <Markdown key={index} {...child} />
        ))}
      </i>
    );
  }
  if (isType<Image>(node, "image")) {
    return (
      <div className={"my-8 lg:mx-auto lg:my-8"}>
        <img
          className={
            "overflow-hidden max-h-96 rounded-xl shadow-lg lg:mx-auto object-cover"
          }
          src={node.url}
          alt={node.alt ?? node.title ?? ""}
        />
        {node.alt && (
          <p className={"my-4 text-gray-500 text-center"}>
            <i>{node.alt}</i>
          </p>
        )}
      </div>
    );
  }
  if (isType<Code>(node, "code")) {
    const language = node.lang;
    return (
      <SyntaxHighlighter
        showLineNumbers
        language={typeof language === "string" ? language : undefined}
        style={theme}
      >
        {node.value}
      </SyntaxHighlighter>
    );
  }
  if (isType<InlineCode>(node, "inlineCode")) {
    return <code className={"text-blue-300"}>{node.value}</code>;
  }
  if ("children" in node) {
    const parent = node as Parent;
    return (
      <>
        {parent.children.map((child, index) => (
          <Markdown key={index} {...child} />
        ))}
      </>
    );
  }
  return null;
};

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
