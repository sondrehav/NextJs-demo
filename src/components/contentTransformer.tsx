import {
  ContentTransformer as CContentTransformer, NodeContent, NodeProps,
  Overrides,
  Props as CProps
} from "@crystallize/react-content-transformer";
import { Prism as  SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from "next/link";

export type ContentTransformerProps = CProps;

/*
* <ul>
  {(props.children ?? []).map((c, i) => <li key={i}>{c.textContent}</li>)}
</ul>
*
* */

const LinkContent = (props: NodeProps) => {
  if(!props.metadata) return null;
  if((props.metadata.href as string).startsWith("/")) {
    return <Link href={props.metadata.href}>
      <a className={"border-b-2 border-gray-300 transition-all hover:border-gray-100"}>
        <NodeContent {...props} />
      </a>;
    </Link>
  }
  return <a href={props.metadata.href} className={"border-b-2 border-gray-300 transition-all hover:border-gray-100"}><NodeContent {...props} /></a>;
};
const QuoteContent = (props: NodeProps) => <p className={"border-l-2 px-4 my-4 border-gray-300 "}><i><NodeContent {...props} /></i></p>;
const ParagraphContent = (props: NodeProps) => <p className={"my-4"}><NodeContent {...props} /></p>;

const r = /^\#\[language\=(\w+)\]$/;
const CodeContent = (props: NodeProps) => {

  const children = [...(props.children ?? [])].filter(s => s.type !== "line-break");
  const language = children[0].textContent ? r.exec(children[0].textContent)?.[1] : undefined;
  if(language) children.shift();

  return <SyntaxHighlighter showLineNumbers language={typeof language === "string" ? language : undefined} style={theme}>
    {children.map(c => c.textContent).join("\n") ?? ""}
  </SyntaxHighlighter>;
}
const UListContent = (props: NodeProps) => <ul className={"list-disc"}>
  {(props.children ?? []).filter(c => c.type === "list-item").map((c, i) => <li key={i} className={"list-item ml-6"}>
    <NodeContent {...c}/>
  </li>)}
</ul>;
const OListContent = (props: NodeProps) => <ul className={"list-decimal"}>
  {(props.children ?? []).filter(c => c.type === "list-item").map((c, i) => <li key={i} className={"list-item ml-6"}>
    <NodeContent {...c}/>
  </li>)}
</ul>;
const InlineCodeContent = (props: NodeProps) => {
  return <code className={"text-blue-300"}>{props.textContent}</code>;
};

const overrides: Overrides = {
  link: LinkContent,
  quote: QuoteContent,
  paragraph: ParagraphContent,
  code: CodeContent,
  "unordered-list": UListContent,
  "ordered-list": OListContent,
  underlined: InlineCodeContent
};

  const ContentTransformer = (props: ContentTransformerProps) => {
    return (<CContentTransformer {...props} overrides={overrides}/>);
  };

export default ContentTransformer;