import {ComponentType, ImageContent, Item, SingleLineContent} from "types/catalogue";
import {Image, Props as ImageProps} from "@crystallize/react-image";
import findComponent from "lib/findComponent";
import {forwardRef, HTMLProps} from "react";
import DateComponent from "components/date";

type Props = { child: Item }
const ChildPageView = forwardRef<HTMLAnchorElement, Props & Pick<HTMLProps<HTMLAnchorElement>, "onClick"|"href">>(({ child, href, onClick }, ref) => {

  const headerImage = findComponent<ImageContent>(child.components ?? [], ComponentType.Images, "header-image")?.firstImage;
  const title = findComponent<SingleLineContent>(child.components ?? [], ComponentType.SingleLine, "title")?.text ?? child.name;
  const author = findComponent<SingleLineContent>(child.components ?? [], ComponentType.SingleLine, "author")?.text ?? child.name;

  const createdAt = child.createdAt;

  return (<a ref={ref} onClick={onClick} href={href} className={"rounded-xl shadow relative flex flex-col transition-all bg-gray-800 hover:bg-gray-700 overflow-hidden"}>
    {headerImage && <div className={"max-h-64 overflow-hidden"}>
        <Image sizes={"(max-width: 600px) 40vw, 700px"} {...headerImage as ImageProps}/>
      </div>
    }
    <div className={"p-4"}>
      <div className={"flex flex-row justify-between items-center"}>
        {author && <span className={"text-sm text-gray-500"}>{author}</span>}
        {createdAt && <span className={"text-sm text-gray-500"}><DateComponent dateString={createdAt}/></span>}
      </div>
      {title && <h3 className={"text-2xl overflow-hidden truncate"}>{title}</h3>}
    </div>
  </a>);
});

ChildPageView.displayName = "ChildPageView";

export default ChildPageView;