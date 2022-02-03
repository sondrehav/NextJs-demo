export interface SupabaseType {}

export interface SBlogType extends SupabaseType {
  identifier: string;
  // eslint-disable-next-line camelcase
  created_at: string;
  title: string;
  // eslint-disable-next-line camelcase
  header_image: string | null;
  description: string | null;
}

export interface SArticleType extends SupabaseType {
  // eslint-disable-next-line camelcase
  blog_identifier: string;
  identifier: string;
  // eslint-disable-next-line camelcase
  created_at: string;
  title: string;
  summary: string | null;
  markdown: string;
  // eslint-disable-next-line camelcase
  header_image: string | null;
  // eslint-disable-next-line camelcase
  is_published: boolean;
}
