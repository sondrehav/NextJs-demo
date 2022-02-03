import { Button, Input, TextArea } from "components/editor/inputs";
import { Controller, useFormContext } from "react-hook-form";
import { ArticleProps } from "types/imageProps";
import ImageUploadEdit from "components/editor/imageUploadEdit";
import { ComponentProps } from "react";
import TransformController from "components/editor/transformController";
import {
  identifierPattern,
  sanitizeIdentifier,
} from "components/editor/common";
import {
  WithAuthenticationContextProps,
  withAuthenticationContext,
} from "components/authentication";

const EditorForm = withAuthenticationContext(
  ({
    initial,
    onSubmit,
    userSession,
  }: { initial?: ArticleProps } & Pick<ComponentProps<"form">, "onSubmit"> &
    WithAuthenticationContextProps) => {
    const {
      reset,
      formState: { errors },
      watch,
    } = useFormContext<ArticleProps>();

    return (
      <>
        <form className={"w-full flex flex-col"} onSubmit={onSubmit}>
          <TransformController
            name={"identifier"}
            transform={{
              output: sanitizeIdentifier,
              input: (value) => value,
            }}
            render={({ field }) => (
              <Input
                {...field}
                label={"Identifier"}
                disabled={!!initial?.identifier || !userSession}
                errorMessage={errors.identifier?.message}
                showError={!!errors.identifier}
              />
            )}
            rules={{
              required: "The article must have a unique identifier",
              pattern: identifierPattern,
            }}
          />

          <Controller
            name={"title"}
            render={({ field }) => (
              <Input
                {...field}
                disabled={!userSession}
                label={"Title"}
                errorMessage={errors.title?.message}
                showError={!!errors.title}
              />
            )}
            rules={{
              required: "The article is required to have a title",
              minLength: {
                value: 3,
                message: "The title must be at least 3 characters",
              },
              maxLength: {
                value: 64,
                message: "The title can be at most 64 characters",
              },
            }}
          />

          <Controller
            name={"markdown"}
            render={({ field }) => (
              <TextArea
                disabled={!userSession}
                className={"h-96"}
                {...field}
                label={"Markdown"}
                errorMessage={errors.markdown?.message}
                showError={!!errors.markdown}
              />
            )}
            rules={{
              required: "The article needs some content for publishing.",
            }}
          />

          <ImageUploadEdit />

          <div className={"flex flex-row justify-between items-center my-4"}>
            <Button label={"Save"} type={"submit"} disabled={!userSession} />
            <Button
              label={"Reset"}
              type={"reset"}
              disabled={!userSession}
              variant={"secondary"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                reset();
              }}
            />
          </div>
        </form>
      </>
    );
  }
);

export default EditorForm;
