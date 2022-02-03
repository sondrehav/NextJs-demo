import { PageLayout } from "components/layout";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from "next";
import { ParsedUrlQuery } from "querystring";
import {
  BlogListingType,
  BlogType,
  getBlogFromIdentifier,
} from "lib/supabase/blogListing";
import { container } from "lib/classes";
import {
  ArticleListingType,
  getArticleListing,
} from "lib/supabase/articleListing";
import ArticlePreview from "components/article/articlePreview";
import { Fragment } from "react";
import classNames from "classnames";

interface StaticPathType extends ParsedUrlQuery {
  blogIdentifier: string;
}

type StaticPropsType = {
  articles: ArticleListingType[];
  blog: BlogType;
};

export const getStaticPaths = async (
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult<StaticPathType>> => {
  // todo: Implement properly!

  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<StaticPathType>
): Promise<GetStaticPropsResult<StaticPropsType>> => {
  const identifier = context.params?.blogIdentifier;
  if (!identifier) throw new Error("No 'blogIdentifier' param.");

  const [blog, articles]: [BlogType | null, ArticleListingType[] | null] =
    await Promise.all([
      getBlogFromIdentifier({ identifier }),
      getArticleListing({ blogIdentifier: identifier }),
    ]);

  if (!blog) return { notFound: true, revalidate: 60 };

  return {
    props: { articles: articles ?? [], blog },
    revalidate: 60,
  };
};

export default function BlogPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <PageLayout
      title={props.blog.title}
      links={[{ label: "Home", path: "/" }]}
      headerImage={{ url: "/images/preview.jpg" }}
    >
      <div className={classNames(container, "my-8")}>
        <h1>{props.blog.title}</h1>
        <h2 className={"subtitle"}>{props.blog.description}</h2>
      </div>
      <div className={container}>
        <ul className={"space-y-2 md:space-y-4"}>
          {props.articles.map((article, index) => (
            <Fragment key={article.identifier}>
              <ArticlePreview {...article}></ArticlePreview>
            </Fragment>
          ))}
          {props.articles.map((article, index) => (
            <Fragment key={article.identifier}>
              <ArticlePreview {...article}></ArticlePreview>
            </Fragment>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}
