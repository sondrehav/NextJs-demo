import {ComponentType, ImageContent, Item, SingleLineContent} from "types/catalogue";
import findComponent from "lib/findComponent";
import {forwardRef, HTMLProps} from "react";
import DateComponent from "components/date";
import {Image} from 'components/image';

type Props = { child: Item }
const ChildPageView = forwardRef<HTMLAnchorElement, Props & Pick<HTMLProps<HTMLAnchorElement>, "onClick"|"href">>(({ child, href, onClick }, ref) => {

  const headerImage = findComponent<ImageContent>(child.components ?? [], ComponentType.Images, "header-image")?.firstImage;
  const title = findComponent<SingleLineContent>(child.components ?? [], ComponentType.SingleLine, "title")?.text ?? child.name;
  const author = findComponent<SingleLineContent>(child.components ?? [], ComponentType.SingleLine, "author")?.text;

  const createdAt = child.createdAt;

  return (<a ref={ref} onClick={onClick} href={href} className={"rounded-xl shadow relative flex flex-col transition-all bg-gray-800 hover:bg-gray-700 overflow-hidden"}>
    {headerImage && <div className={"max-h-32 sm:max-h-64 overflow-hidden"}>
        <Image className={"w-full object-cover object-center max-h-inherit"} sizes={"(min-width: 768px) 480px, 100vw"} {...headerImage}/>
      </div>
    }
    <div className={"p-4"}>
      <div className={"flex flex-row justify-between items-center"}>
        {author && <span className={"text-sm text-gray-500"}>{author}</span>}
        {createdAt && <span className={"text-sm text-gray-500"}><DateComponent dateString={createdAt}/></span>}
      </div>
      {title && <h3 title={title} className={"text-1xl overflow-hidden truncate"}>{title}</h3>}
    </div>
  </a>);
});

ChildPageView.displayName = "ChildPageView";

export default ChildPageView;