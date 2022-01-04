import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import Layout from "components/layout";
import classNames from "classnames";
import { container } from "lib/classes";

import TextArea from "components/textArea";
import { remark } from "remark";
import MarkdownPreview from "components/markdownPreview";
import { useState } from "react";

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
  const [markdown, setMarkdown] = useState("");

  return (
    <div className={"flex flex-col h-screen"}>
      <Layout links={[]} title={"Edit"} />
      <div
        className={classNames(
          container,
          "my-8 flex flex-col lg:justify-between lg:flex-row lg:space-x-4",
          "h-auto lg:h-full flex-grow-1"
        )}
      >
        <div className={"w-full flex flex-col"}>
          <h3 className={"text-xl my-4"}>Edit source</h3>
          <TextArea
            className={"flex-grow-1 flex-shrink-1 h-64 lg:h-auto"}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>
        <div className={"w-full flex flex-col"}>
          <h3 className={"text-xl my-4"}>Preview</h3>
          <div
            className={
              "flex-grow-1 flex-shrink-1 h-64 lg:h-auto relative overflow-auto"
            }
          >
            <MarkdownPreview content={markdown} />
          </div>
        </div>
      </div>
    </div>
  );
}
