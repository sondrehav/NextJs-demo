import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import anonClient from "lib/supabase/anonClient";
import { User } from "@supabase/gotrue-js";
import Layout from "components/layout";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { container, smallImagePreviewWrapper } from "lib/classes";
import generateAnonymousName from "lib/generateAnonymousName";
import { Button, Checkbox, Input } from "components/editor/inputs";
import { useForm } from "react-hook-form";
import SmallPreview from "components/editor/smallPreview";
import { useDropzone } from "react-dropzone";
import ImageIcon from "icons/image.svg";
import classNames from "classnames";
import { useEffect, useState } from "react";

type UserInformationPropsType = {
  user: User | null;
  userInformation: any;
  name: string;
};

const JSONView = ({ value }: { value: string }) => (
  <SyntaxHighlighter showLineNumbers language={"json"} style={theme}>
    {value}
  </SyntaxHighlighter>
);

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<UserInformationPropsType>
> => {
  const client = anonClient();

  const { user } = await client.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      notFound: true,
    };
  }

  const userInformation = await client
    .from("user_information")
    .select("*")
    .eq("id", user.id)
    .then((res) => res.data?.[0] ?? null);

  const name = userInformation?.name ?? generateAnonymousName(user.id);

  return {
    props: { user, userInformation, name },
  };
};

const Anonymous = ({ name }: { name: string }) => (
  <>
    <h1>Hello, anonymous {name}!</h1>
    <p>
      You are currently an anonymous user. Enable public view below to have your
      information shown in comments.
    </p>
  </>
);

const ImageUploadThingy = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      const preview = URL.createObjectURL(image);
      setPreview(preview);
      return () => {
        URL.revokeObjectURL(preview);
        setPreview(null);
      };
    }
  }, [image]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDropAccepted: (file: File[]) => {
        if (file[0]) {
          setImage(file[0]);
        } else {
          setImage(null);
        }
      },
      accept: ["image/png", "image/jpeg", "image/webp"],
      multiple: false,
    });

  return (
    <div className={smallImagePreviewWrapper} {...getRootProps()}>
      {/* {...register(`images.${index}.identifier`)} */}
      <input className={"hidden"} {...getInputProps()} />
      {preview ? (
        <SmallPreview
          className={"w-full h-full object-cover"}
          image={{
            url: preview,
          }}
        />
      ) : (
        <ImageIcon
          width={24}
          height={24}
          className={classNames(
            "fill-current absolute transition-all top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          )}
        />
      )}
    </div>
  );
};

export default function UserInformation({
  user,
  userInformation,
  name,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const form = useForm();

  return (
    <Layout>
      <div className={container}>
        {userInformation ? <></> : <Anonymous name={name} />}
        <JSONView value={JSON.stringify(user, undefined, 4)} />
        <JSONView value={JSON.stringify(userInformation, undefined, 4)} />
      </div>
      <div className={container}>
        <form
          className={
            "p-2 rounded border border-gray-700 flex flex-col space-y-2"
          }
        >
          <Input label={"Display name"} />
          <Input label={"Email"} />
          <Checkbox label={"Show email"} />
          <ImageUploadThingy />
          <Button type={"submit"}>Update details</Button>
        </form>
      </div>
    </Layout>
  );
}
