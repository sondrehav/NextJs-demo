import ContentTransformer, {ContentTransformerProps} from "components/contentTransformer";
import {ParagraphContent} from "types/catalogue";
import ImageView from "components/imageView";

const Paragraph = ({ body, title, images }: ParagraphContent) => {
  return (<section className={"my-8 lg:my-12"}>
    { title?.text && <h2 className={"text-2xl my-4"}>{title.text}</h2> }
    { images && <ImageView images={images} />}
    { body?.json && <ContentTransformer json={body.json as ContentTransformerProps["json"]}/> }
  </section>);
};

export default Paragraph;