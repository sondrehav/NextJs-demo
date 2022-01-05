import { Node, Parent } from "unist";
import {
  Blockquote,
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
import { createElement, Fragment } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ImageView from "components/images/imageView";
import { NodeContent } from "@crystallize/react-content-transformer";

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
  if (isType<Blockquote>(node, "blockquote")) {
    console.log(node);
    return (
      <p className={"border-l-2 px-4 my-4 border-gray-300 "}>
        <i>
          {node.children.map((child, index) => (
            <Markdown key={index} {...child} />
          ))}
        </i>
      </p>
    );
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
    return <ImageView {...node} caption={node.title ?? undefined} />;
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
  if (isType<Text>(node, "text")) {
    const [first, ...lines] = node.value.split("\n");
    return (
      <>
        {first}
        {lines.map((line, index) => (
          <Fragment key={index}>
            <br />
            {line}
          </Fragment>
        ))}
      </>
    );
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

export default Markdown;
