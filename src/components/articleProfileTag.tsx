import {
  ComponentType,
  ImageContent,
  Item,
  SingleLineContent,
} from "types/catalogue";
import findComponent from "lib/findComponent";
import { Image } from "components/images/image";
import { Image as ImageProps } from "types/image";

const ArticleProfileTag = ({ item }: { item: Item }) => {
  if (!item.components) return null;

  const name = findComponent<SingleLineContent>(
    item.components,
    ComponentType.SingleLine,
    "name"
  )?.text;
  const contact = findComponent<SingleLineContent>(
    item.components,
    ComponentType.SingleLine,
    "contact"
  )?.text;
  const image = findComponent<ImageContent>(
    item.components,
    ComponentType.Images,
    ""
  )?.firstImage;

  return (
    <div className={"flex flex-row items-center space-x-2 sm:space-x-4"}>
      {image && (
        <div
          className={
            "rounded-full flex-grow-0 flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 border-2 border-gray-800 shadow-lg overflow-hidden"
          }
        >
          <Image
            className={"w-full h-full object-cover"}
            sizes={"(max-width: 384px) 48px, 32px"}
            {...(image as ImageProps)}
          />
        </div>
      )}
      <div className={"leading-none sm:leading-normal flex-1"}>
        {name && <h3 className={"text-sm sm:text-base"}>Av {name}</h3>}
        {contact && (
          <a href={`mailto:${contact}`}>
            <span className={"text-gray-500 text-xs sm:text-sm"}>
              {contact}
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ArticleProfileTag;
