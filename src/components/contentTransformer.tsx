import {
  ContentTransformer as CContentTransformer, NodeContent, NodeProps,
  Overrides,
  Props as CProps
} from "@crystallize/react-content-transformer";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export type ContentTransformerProps = CProps;

const overrides: Overrides = {
  link: (props: NodeProps) => <a href={props.metadata!.href} className={"border-b-2 border-gray-300 transition-all hover:border-gray-100"}><NodeContent {...props} /></a>,
  quote: (props: NodeProps) => <p className={"border-l-2 px-4 my-4 border-gray-300 "}><i><NodeContent {...props} /></i></p>,
  paragraph: (props: NodeProps) => <p className={"my-4"}><NodeContent {...props} /></p>,
  code: (props: NodeProps) => <>
    <SyntaxHighlighter showLineNumbers language="tsx" style={theme}>
      {props.children?.filter(s => s.type !== "line-break").map(c => c.textContent).join("\n") ?? ""}
    </SyntaxHighlighter>
  </>
};

const ContentTransformer = (props: ContentTransformerProps) => {
  return (<CContentTransformer className={""} {...props} overrides={overrides}/>);
};

export default ContentTransformer;