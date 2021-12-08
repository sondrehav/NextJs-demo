import classNames from "classnames";
import {container} from "lib/classes";
import ArticleProfileTag from "components/articleProfileTag";
import DateComponent from "components/date";
import findComponent from "lib/findComponent";
import {ComponentType, Item, ItemRelationsContent, SingleLineContent} from "types/catalogue";

const ArticleHeader = (item: Item) => {

  const title= findComponent<SingleLineContent>(item.components ?? [], ComponentType.SingleLine, "title")?.text ?? item.name;
  const authors = findComponent<ItemRelationsContent>(item.components ?? [] , ComponentType.ItemRelations, "author")?.items;

  return <div className={classNames(container, "my-6 overflow-x-hidden space-y-4")}>
    {title && <h1 className={"text-3xl"}>{title}</h1>}
    {authors && <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4"}>
      {authors.map((author, i) => <ArticleProfileTag key={i} item={author}/>)}
    </div>}
    {item.createdAt && <div className={"opacity-50"}>
        <span className={"my-4"}>
          <i>Opprettet <DateComponent dateString={item.createdAt}/></i>
        </span>
    </div>}
  </div>
};

export default ArticleHeader;