import Layout, { PageLayout } from "components/layout";
import findComponent from "lib/findComponent";
import {
  ComponentType,
  Item,
  ItemRelationsContent,
  Maybe,
  ParagraphCollectionContent,
} from "types/catalogue";
import classNames from "classnames";
import { container } from "lib/classes";
import Link from "next/link";
import ChildPageView from "components/childPageView";
import Paragraph from "components/paragraph";
import ArticleHeader from "components/articleHeader";
import { LinkItemProps } from "components/navbar";

const AlbumPage = ({
  catalogue,
  links,
}: {
  catalogue: Item;
  links: LinkItemProps[];
}) => {
  const content = findComponent<ParagraphCollectionContent>(
    catalogue.components ?? [],
    ComponentType.ParagraphCollection,
    "page-content"
  )?.paragraphs;
  const relatedArticles = findComponent<ItemRelationsContent>(
    catalogue.components ?? [],
    ComponentType.ItemRelations,
    "related-articles"
  )?.items;

  return (
    <PageLayout item={catalogue} links={links}>
      <ArticleHeader {...catalogue} />

      {content && (
        <div className={classNames(container, "my-12")}>
          {content.map((paragraph, i) => (
            <Paragraph key={i} {...paragraph} />
          ))}
        </div>
      )}

      {relatedArticles && relatedArticles?.length > 0 && (
        <div className={classNames(container, "my-8")}>
          <h2 className={classNames(container, "text-2xl my-8")}>
            Relaterte artikler
          </h2>
          <div
            className={classNames(
              container,
              "my-6 overflow-x-hidden grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8"
            )}
          >
            {relatedArticles.map((child) => (
              <Link
                key={child.path}
                href={child.path!.replace("/web", "")}
                passHref
              >
                <ChildPageView child={child} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {catalogue.children && (
        <div
          className={classNames(
            container,
            "my-8 overflow-x-hidden grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8"
          )}
        >
          {catalogue.children?.map((child) => (
            <Link
              key={child.id}
              href={child.path!.replace("/web", "")}
              passHref
            >
              <ChildPageView child={child} />
            </Link>
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export default AlbumPage;
