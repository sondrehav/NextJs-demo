import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";

type EditPagePropsType = {};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<EditPagePropsType>> => {
  return {
    props: {},
  };
};

export default function EditPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <pre>{JSON.stringify(props, undefined, 4)}</pre>;
}
