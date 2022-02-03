import { ImageProps } from "types/imageProps";
import getClient from "lib/supabase/client";
import { SBlogType, SupabaseType } from "types/supabaseDataTypes";
import { SupabaseClient } from "@supabase/supabase-js";
import getPostgresError from "lib/supabase/error";

export type BlogListingType = {
  title: string;
  createdAt: string;
  identifier: string;
  headerImage: ImageProps | null;
};

export type BlogType = BlogListingType & {
  description: string | null;
};

const mapBlogListingResult = ({
  identifier,
  // eslint-disable-next-line camelcase
  created_at,
  title,
  // eslint-disable-next-line camelcase
  header_image,
}: Omit<SBlogType, "description">): BlogListingType => ({
  identifier,
  createdAt: created_at,
  title,
  // eslint-disable-next-line camelcase
  headerImage: header_image ? { url: header_image } : null,
});

const mapBlogResult = ({ description, ...rest }: SBlogType): BlogType => ({
  description,
  ...mapBlogListingResult(rest),
});

export const getBlogListings = async (
  { limit = 8 }: { limit?: number },
  client?: SupabaseClient
) => {
  const sb = client ?? (await getClient());
  const { data, error } = await sb
    .from<SBlogType>("blogs")
    .select("*")
    .limit(limit)
    .order("created_at");
  if (error) throw getPostgresError(error);
  return data?.map((item) => mapBlogListingResult(item)) ?? null;
};

export const getBlogFromIdentifier = async (
  { identifier }: { identifier: string },
  client?: SupabaseClient
) => {
  const sb = client ?? (await getClient());

  const { data, error } = await sb
    .from<SBlogType>("blogs")
    .select("*")
    .eq("identifier", identifier);
  if (error) throw getPostgresError(error);
  return data?.map((item) => mapBlogResult(item))?.[0] ?? null;
};
