import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import Layout from "components/layout";
import classNames from "classnames";
import { container, inputCommon } from "lib/classes";

import { TextArea } from "components/editor/inputs";
import { remark } from "remark";
import MarkdownPreview from "components/editor/markdownPreview";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { ImageProvider } from "components/images/imagePreviewProvider";
import EditorForm from "components/editor/editorForm";

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
      path,
    },
  };
};

export default function EditPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  /* const [name, setName] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const onImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files?.[0]) return;
    const image = event.target.files[0];
    setImages((images) => [...images, URL.createObjectURL(image)]);
  };*/

  const [markdown, setMarkdown] = useState("");

  return (
    <div className={"flex flex-col h-screen"}>
      <Layout links={[]} title={"Edit"} />
      <div
        className={classNames(
          container,
          "py-8 flex flex-col lg:justify-between lg:flex-row lg:space-x-4",
          "h-auto lg:h-full flex-grow-1"
        )}
      >
        <EditorForm
          initial={{ markdown, title: "", identifier: "", images: [] }}
          onWatch={(value, { name, type }) => {
            if (name === "markdown" && type === "change" && value.markdown) {
              setMarkdown(value.markdown);
            }
          }}
        />
        <div className={"w-full flex flex-col"}>
          <h3 className={"text-xl my-4"}>Preview</h3>
          <div
            className={
              "flex-grow-1 flex-shrink-1 h-64 lg:h-auto relative overflow-auto"
            }
          >
            <ImageProvider>
              <MarkdownPreview content={markdown} />
            </ImageProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
