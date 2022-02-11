import {
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from "next";
import Layout from "components/layout";
import { container } from "lib/classes";
import { Button, ButtonLink } from "components/editor/inputs";
import Link from "next/link";
import serviceClient from "lib/supabase/serviceClient";

export const getStaticProps = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<{}>> => {
  return {
    props: {},
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
        <Link href={"/edit"} passHref>
          <ButtonLink>Edit</ButtonLink>
        </Link>
      </div>
    </Layout>
  );
}
