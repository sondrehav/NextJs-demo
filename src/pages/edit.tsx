import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import Layout from "components/layout";
import classNames from "classnames";
import { container } from "lib/classes";
import MarkdownPreview from "components/editor/markdownPreview";
import { useState } from "react";
import { ImageContextEditorProvider } from "components/images/imagePreviewProvider";
import EditorForm from "components/editor/editorForm";
import { FormProvider, useForm } from "react-hook-form";
import { ArticleProps } from "types/image";

type EditPagePropsType = {};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<EditPagePropsType>> => {
  const { path } = context.query;
  if (typeof path === "string") {
    // todo: Get page details here..
  }

  return {
    props: {
      path: "",
    },
  };
};

export default function EditPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const formProps = useForm<ArticleProps>({
    defaultValues: { identifier: "", images: [], title: "", markdown: "" },
    reValidateMode: "onSubmit",
  });

  const onSubmit = (data: ArticleProps) => {
    console.log(data);
  };

  return (
    <FormProvider {...formProps}>
      <ImageContextEditorProvider>
        <form
          className={"flex flex-col h-screen"}
          onSubmit={formProps.handleSubmit(onSubmit)}
        >
          <Layout links={[]} title={"Edit"} />
          <div
            className={classNames(
              container,
              "py-8 flex flex-col lg:justify-between lg:flex-row lg:space-x-4",
              "h-auto lg:h-full flex-grow-1"
            )}
          >
            <EditorForm />
            <div className={"w-full flex flex-col"}>
              <h3 className={"text-xl my-4"}>Preview</h3>
              <div
                className={
                  "relative h-64 lg:h-full overflow-auto " +
                  "p-3 bg-gray-800 shadow-lg rounded"
                }
              >
                <div className={"absolute"}>
                  <MarkdownPreview />
                </div>
              </div>
            </div>
          </div>
        </form>
      </ImageContextEditorProvider>
    </FormProvider>
  );
}
