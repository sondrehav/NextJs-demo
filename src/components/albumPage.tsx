import Layout from "components/layout";
import findComponent from "lib/findComponent";
import {ComponentType, ImageContent, Item, RichTextContent, SingleLineContent} from "types/catalogue";
import DateComponent from "components/date";
import ContentTransformer, {ContentTransformerProps} from "components/contentTransformer";
import ImageView from "components/imageView";
import classNames from "classnames";
import {container} from "lib/classes";

const AlbumPage = (item: Item) => {

  const title= findComponent<SingleLineContent>(item.components ?? [], ComponentType.SingleLine, "title")?.text ?? name;
  const content = findComponent<RichTextContent>(item.components ?? [] , ComponentType.RichText, "content")?.json;
  const images = findComponent<ImageContent>(item.components ?? [], ComponentType.Images, "images")?.images;
  const author = findComponent<SingleLineContent>(item.components ?? [], ComponentType.SingleLine, "author")?.text;
  const authorContact = findComponent<SingleLineContent>(item.components ?? [], ComponentType.SingleLine, "author-contact")?.text;

  return (<Layout item={item}>
    <div className={classNames(container, "my-6 overflow-x-hidden")}>
      {item.createdAt && <span className={"opacity-50"}><i>Opprettet <DateComponent dateString={item.createdAt}/></i></span>}
      {images && <ImageView images={images}/>}
      <section>
        {author && <h3>Av {author}</h3>}
        {authorContact && <a href={`mailto:${authorContact}`}><span className={"text-sm text-gray-500"}>{authorContact}</span></a>}
      </section>
      {title && <h1 className={"text-3xl my-8"}>{title}</h1>}
      {content && <ContentTransformer json={content as ContentTransformerProps["json"]}/>}
    </div>
  </Layout>)

};

export default AlbumPage;