import {
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from "next";
import Layout from "components/layout";
import { container } from "lib/classes";
import BlogPreview from "components/blog/blogPreview";
import CreateBlogSection from "components/blog/createBlogSection";
import { RequireAuthentication } from "components/authentication";
import { BlogListingType, getBlogListings } from "lib/supabase/blogListing";
import client from "lib/supabase/client";
import { useEffect } from "react";

export const getStaticProps = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<{ blogListings: BlogListingType[] }>> => {
  const blogListings = await getBlogListings({});
  if (blogListings === null) return { notFound: true, revalidate: 60 };

  return {
    props: {
      blogListings,
    },
    revalidate: 60,
  };
};

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout>
      <div className={container}>
        <h1>Blogs and other crap!</h1>
        <ul className={"flex flex-row -m-4 flex-wrap align-center"}>
          {props.blogListings.map((blog) => (
            <li key={blog.identifier} className={"m-4 flex"}>
              <BlogPreview
                name={blog.title}
                identifier={blog.identifier}
                headerImage={blog.headerImage ? blog.headerImage : undefined}
              />
            </li>
          ))}
        </ul>
      </div>
      <RequireAuthentication>
        <CreateBlogSection />
      </RequireAuthentication>
    </Layout>
  );
}
