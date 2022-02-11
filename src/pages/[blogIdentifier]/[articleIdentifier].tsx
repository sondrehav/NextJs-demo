import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from "next";
import { ParsedUrlQuery } from "querystring";
import Layout, { PageLayout } from "components/layout";
import {
  ArticleType,
  getArticleFromIdentifier,
} from "lib/supabase/articleListing";
import { container } from "lib/classes";
import MarkdownRender from "components/article/markdownRender";
import { remark } from "remark";
import Markdown from "components/article/markdownRender";
import classNames from "classnames";
import serviceClient from "lib/supabase/serviceClient";

interface StaticPathType extends ParsedUrlQuery {
  blogIdentifier: string;
  articleIdentifier: string;
}
type StaticPropsType = {
  article: ArticleType;
};

export const getStaticPaths = async (
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult<StaticPathType>> => {
  // todo: Make me!

  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<StaticPathType>
): Promise<GetStaticPropsResult<StaticPropsType>> => {
  const params = context.params;
  if (!params) throw new Error("No params set.");

  const { articleIdentifier, blogIdentifier } = params;

  const article = await getArticleFromIdentifier(
    {
      articleIdentifier,
      blogIdentifier,
    },
    serviceClient()
  );

  if (!article) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: {
      article,
    },
    revalidate: 60,
  };
};

export default function ArticlePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <PageLayout
      title={props.article.title}
      links={[]}
      headerImage={props.article.headerImage ?? undefined}
    >
      <div className={classNames(container, "my-8")}>
        <h1>{props.article.title}</h1>
        <h2 className={"subtitle"}>{props.article.summary}</h2>
      </div>
      <div className={classNames(container, "my-8")}>
        <MarkdownRenderWrapper markdown={props.article.markdown} />
      </div>
    </PageLayout>
  );
}

const MarkdownRenderWrapper = ({ markdown }: { markdown: string }) => {
  const result = remark().parse(markdown);
  if (!result) return null;
  return <Markdown {...result} />;
};
