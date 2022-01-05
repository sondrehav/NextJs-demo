import ContentTransformer, {
  ContentTransformerProps,
} from "components/contentTransformer";
import { ParagraphContent } from "types/catalogue";
import ImageView from "components/images/imageView";
import { Image as ImageProps } from "types/image";

const Paragraph = ({ body, title, images }: ParagraphContent) => {
  return (
    <section className={"my-8 lg:my-12"}>
      {title?.text && <h2 className={"text-2xl my-4"}>{title.text}</h2>}
      {images &&
        images.map((image) => (
          <ImageView
            key={image.url}
            {...(image as ImageProps)}
            caption={image.caption?.plainText?.join("\n") ?? undefined}
          />
        ))}
      {body?.json && (
        <ContentTransformer
          json={body.json as ContentTransformerProps["json"]}
        />
      )}
    </section>
  );
};

export default Paragraph;
