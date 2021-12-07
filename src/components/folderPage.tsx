import {ComponentType, Item, ItemRelationsContent, RichTextContent, SingleLineContent} from "types/catalogue";
import Layout from "components/layout";
import findComponent from "lib/findComponent";
import ChildPageView from "components/childPageView";
import Link from "next/link";
import classNames from "classnames";
import {container} from "lib/classes";
import DateComponent from "components/date";
import ArticleProfileTag from "components/articleProfileTag";
import ContentTransformer, {ContentTransformerProps} from "components/contentTransformer";

const FolderPage = (item: Item) => {

  const title= findComponent<SingleLineContent>(item.components ?? [], ComponentType.SingleLine, "title")?.text ?? name ?? "";
  const content = findComponent<RichTextContent>(item.components ?? [] , ComponentType.RichText, "content")?.json;
  const authors = findComponent<ItemRelationsContent>(item.components ?? [] , ComponentType.ItemRelations, "author")?.items;

  return (<Layout item={item}>

    <div className={classNames(container, "my-6 overflow-x-hidden space-y-4")}>
      <div className={"flex flex-row justify-between items-center my-2"}>
        {title && <h1 className={"text-3xl"}>{title}</h1>}
        {item.createdAt && <span className={"opacity-50"}><i>Opprettet <DateComponent dateString={item.createdAt}/></i></span>}
      </div>
      {authors && <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4"}>
        {authors.map((author, i) => <ArticleProfileTag key={i} item={author}/>)}
      </div>}
    </div>
    <div className={classNames(container, "my-12")}>
      {content && <ContentTransformer json={content as ContentTransformerProps["json"]}/>}
    </div>

    <div className={classNames(container, "my-8 overflow-x-hidden grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8")}>
      {item.children?.map(child => <Link key={child.id} href={child.path!.replace("/web", "")} passHref><ChildPageView child={child}/></Link>)}
    </div>

  </Layout>);
};

export default FolderPage;