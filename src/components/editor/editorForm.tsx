import { Button, Input, TextArea } from "components/editor/inputs";
import { Controller, useFormContext } from "react-hook-form";
import { ArticleProps } from "types/image";
import ImageUploadEdit from "components/editor/imageUploadEdit";
import { UseFormHandleSubmit } from "react-hook-form/dist/types/form";
import { ComponentProps } from "react";

const EditorForm = ({
  initial,
  onSubmit,
}: { initial?: ArticleProps } & Pick<ComponentProps<"form">, "onSubmit">) => {
  const {
    reset,
    formState: { errors },
  } = useFormContext<ArticleProps>();

  return (
    <>
      <form className={"w-full flex flex-col"} onSubmit={onSubmit}>
        <Controller
          name={"identifier"}
          render={({ field }) => (
            <Input
              {...field}
              label={"Identifier"}
              disabled={!!initial?.identifier}
              errorMessage={errors.identifier?.message}
              showError={!!errors.identifier}
            />
          )}
          rules={{
            required: "The article must have a unique identifier",
            pattern: {
              value: /^[\da-z][\da-z\d-]{2,14}[\da-z\d]$/,
              message:
                "The identifier must be all lower-case, only include letters, numbers and '-'. " +
                "It must start with a letter and end in a letter or number. " +
                "It must be between 4 and 16 characters.",
            },
          }}
        />

        <Controller
          name={"title"}
          render={({ field }) => (
            <Input
              {...field}
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
              className={"h-96"}
              {...field}
              label={"Markdown"}
              errorMessage={errors.markdown?.message}
              showError={!!errors.markdown}
            />
          )}
          rules={{ required: "The article needs some content for publishing." }}
        />

        <ImageUploadEdit />

        <div className={"flex flex-row justify-between items-center my-4"}>
          <Button label={"Save"} type={"submit"} />
          <Button
            label={"Reset"}
            type={"reset"}
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
};

export default EditorForm;
