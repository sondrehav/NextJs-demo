import { ImageProps } from "types/imageProps";
import getClient from "lib/supabase/client";
import { SArticleType, SBlogType, SupabaseType } from "types/supabaseDataTypes";
import { SupabaseClient } from "@supabase/supabase-js";
import getPostgresError from "lib/supabase/error";

export type ArticleListingType = {
  identifier: string;
  createdAt: string;
  title: string;
  summary: string | null;
  isPublished: boolean;
  blogIdentifier: string;
  headerImage: ImageProps | null;
};

export type ArticleType = ArticleListingType & {
  markdown: string;
};

const mapArticleListing = ({
  identifier,
  // eslint-disable-next-line camelcase
  created_at,
  title,
  // eslint-disable-next-line camelcase
  header_image,
  // eslint-disable-next-line camelcase
  blog_identifier,
  // eslint-disable-next-line camelcase
  is_published,
  summary,
}: Omit<SArticleType, "markdown">): ArticleListingType => ({
  identifier,
  createdAt: created_at,
  title,
  // eslint-disable-next-line camelcase
  headerImage: header_image ? { url: header_image } : null,
  blogIdentifier: blog_identifier,
  isPublished: is_published,
  summary,
});

const mapArticle = ({ markdown, ...rest }: SArticleType): ArticleType => ({
  markdown,
  ...mapArticleListing(rest),
});

export const getArticleListing = async (
  { blogIdentifier, limit = 8 }: { blogIdentifier: string; limit?: number },
  client?: SupabaseClient
): Promise<ArticleListingType[] | null> => {
  const sb = client ?? (await getClient());
  const { data, error } = await sb
    .from<Omit<SArticleType, "markdown">>("articles")
    .select(
      "blog_identifier, identifier, created_at, title,summary, header_image, is_published"
    )
    .limit(limit)
    .order("created_at");
  if (error) throw getPostgresError(error);
  return data?.map((item) => mapArticleListing(item)) ?? null;
};

export const getArticleFromIdentifier = async (
  {
    articleIdentifier,
    blogIdentifier,
  }: { articleIdentifier: string; blogIdentifier: string },
  client?: SupabaseClient
): Promise<ArticleType | null> => {
  const sb = client ?? (await getClient());

  const { data, error } = await sb
    .from<SArticleType>("articles")
    .select("*")
    .eq("identifier", articleIdentifier)
    .eq("blog_identifier", blogIdentifier);
  if (error) throw getPostgresError(error);
  return data?.map((item) => mapArticle(item))?.[0] ?? null;
};
