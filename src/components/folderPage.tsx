import {ComponentType, Item, RichTextContent, SingleLineContent} from "types/catalogue";
import Layout from "components/layout";
import findComponent from "lib/findComponent";
import ContentTransformer, {ContentTransformerProps} from "components/contentTransformer";
import ChildPageView from "components/childPageView";
import Link from "next/link";
import classNames from "classnames";
import {container} from "lib/classes";
import DateComponent from "components/date";

const FolderPage = (item: Item) => {

  const title= findComponent<SingleLineContent>(item.components ?? [], ComponentType.SingleLine, "title")?.text ?? name ?? "";
  const content = findComponent<RichTextContent>(item.components ?? [] , ComponentType.RichText, "content")?.json;
  const author = findComponent<SingleLineContent>(item.components ?? [], ComponentType.SingleLine, "author")?.text;
  const authorContact = findComponent<SingleLineContent>(item.components ?? [], ComponentType.SingleLine, "author-contact")?.text;


  return (<Layout item={item}>


    <div className={classNames(container, "my-6 overflow-x-hidden")}>
      {title && <h1 className={"text-3xl my-4"}>{title}</h1>}
      {item.createdAt && <span className={"opacity-50"}><i>Opprettet <DateComponent dateString={item.createdAt}/></i></span>}
      <section>
        {author && <h3>Av {author}</h3>}
        {authorContact && <a href={`mailto:${authorContact}`}><span className={"text-sm text-gray-500"}>{authorContact}</span></a>}
      </section>
      {content && <div className={"my-4"}><ContentTransformer json={content as ContentTransformerProps["json"]}/></div>}
    </div>

    <div className={classNames(container, "my-6 overflow-x-hidden grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8")}>
      {item.children?.map(child => <Link key={child.id} href={child.path!.replace("/web", "")} passHref><ChildPageView child={child}/></Link>)}
    </div>

  </Layout>);
};

export default FolderPage;