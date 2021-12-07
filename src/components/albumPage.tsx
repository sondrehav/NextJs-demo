import Layout from "components/layout";
import findComponent from "lib/findComponent";
import {
  ComponentType,
  Item,
  ItemRelationsContent,
  ParagraphCollectionContent,
  SingleLineContent
} from "types/catalogue";
import DateComponent from "components/date";
import classNames from "classnames";
import {container} from "lib/classes";
import Link from "next/link";
import ChildPageView from "components/childPageView";
import Paragraph from "components/paragraph";
import ArticleProfileTag from "components/articleProfileTag";

const AlbumPage = (item: Item) => {

  const title= findComponent<SingleLineContent>(item.components ?? [], ComponentType.SingleLine, "title")?.text ?? name;
  const content = findComponent<ParagraphCollectionContent>(item.components ?? [] , ComponentType.ParagraphCollection, "page-content")?.paragraphs;
  const relatedArticles = findComponent<ItemRelationsContent>(item.components ?? [], ComponentType.ItemRelations, "related-articles")?.items;
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


    {content && <div className={classNames(container, "my-12")}>
      {content.map((paragraph, i) => <Paragraph key={i} {...paragraph}/>)}
    </div>}

    {relatedArticles && relatedArticles?.length > 0 && <>
    {title && <h2 className={classNames(container, "text-2xl my-8")}>Relaterte artikler</h2>}
    <div className={classNames(container, "my-6 overflow-x-hidden grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8")}>
      {relatedArticles.map(child => <Link key={child.id} href={child.path!.replace("/web", "")} passHref><ChildPageView child={child}/></Link>)}
    </div>
  </>}

  </Layout>)

};

export default AlbumPage;