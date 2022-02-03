import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import Layout from "components/layout";
import classNames from "classnames";
import { container } from "lib/classes";
import MarkdownPreview from "components/editor/markdownPreview";
import EditorForm from "components/editor/editorForm";
import { FormProvider, useForm } from "react-hook-form";
import { ArticleProps } from "types/imageProps";
import { RequireAuthentication } from "components/authentication";

import dynamic from "next/dynamic";

const NavProfile = dynamic(import("components/navProfile"), { ssr: false });

type EditPagePropsType = { path: string | null };

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<EditPagePropsType>> => {
  /* const { Auth: SSRAuth }: { Auth: typeof Auth } = withSSRContext(context);
  const userInfo = await SSRAuth.currentUserInfo();
  if (!userInfo) {
  } */

  const { path } = context.query;
  if (typeof path === "string") {
    // todo: Get page details here..
  }

  return {
    props: {
      path: path && typeof path === "string" ? path : null,
    },
  };
};

const EditPageInner = ({
  path,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const formProps = useForm<ArticleProps>({
    defaultValues: {
      identifier: "",
      images: [],
      title: "",
      markdown: "",
    },
    reValidateMode: "onSubmit",
  });

  const onSubmit = (data: ArticleProps) => {
    console.log(data);
  };

  return (
    <>
      <FormProvider {...formProps}>
        <div className={"flex flex-col h-screen"}>
          <Layout links={[]} title={"Edit"} />
          <div className={classNames(container, "mt-8")}>
            <NavProfile />
          </div>
          <div
            className={classNames(
              container,
              "my-8 flex flex-col lg:justify-between lg:flex-row lg:space-x-4",
              "h-auto lg:h-full flex-grow-1"
            )}
          >
            <EditorForm onSubmit={formProps.handleSubmit(onSubmit)} />
            <div className={"w-full flex flex-col"}>
              <h3 className={"text-xl my-4"}>Preview</h3>
              <div
                className={
                  "relative -lg:max-h-screen lg:h-full overflow-auto " +
                  "p-3 bg-gray-800 shadow-lg rounded w-full"
                }
              >
                <div className={"relative lg:absolute"}>
                  <MarkdownPreview />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default function EditPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <RequireAuthentication showModal>
      <EditPageInner {...props} />
    </RequireAuthentication>
  );
}
