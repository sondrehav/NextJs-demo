import {
  WithAuthenticationContextProps,
  withAuthenticationContext,
} from "components/authentication";
import { container } from "lib/classes";
import { Controller, useForm } from "react-hook-form";
import TransformController from "components/editor/transformController";
import {
  identifierPattern,
  sanitizeIdentifier,
} from "components/editor/common";
import { Button, Input } from "components/editor/inputs";
import { useRouter } from "next/router";

type CreateBlogInput = {
  blogIdentifier: string;
  name: string;
};

const CreateBlogForm = () => {
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
  } = useForm({ reValidateMode: "onSubmit" });

  const onSubmit = async (input: CreateBlogInput) => {
    console.log(input);
  };

  return (
    <form className={"w-full flex flex-col"} onSubmit={handleSubmit(onSubmit)}>
      <TransformController
        name={"blogIdentifier"}
        control={control}
        transform={{
          output: sanitizeIdentifier,
          input: (value) => value,
        }}
        render={({ field }) => (
          <Input
            {...field}
            label={"Blog identifier"}
            errorMessage={errors.blogIdentifier?.message}
            showError={!!errors.blogIdentifier}
          />
        )}
        rules={{
          required: "The blog must have a unique identifier",
          pattern: identifierPattern,
        }}
      />

      <Controller
        name={"name"}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={"Name"}
            errorMessage={errors.name?.message}
            showError={!!errors.name}
          />
        )}
        rules={{
          required: "The blog is required to have a name",
          minLength: {
            value: 3,
            message: "The name must be at least 3 characters",
          },
          maxLength: {
            value: 64,
            message: "The name can be at most 64 characters",
          },
        }}
      />

      <div className={"flex flex-row justify-between items-center my-4"}>
        <Button label={"Create"} type={"submit"} />
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
  );
};

const CreateBlogSection = withAuthenticationContext(
  ({ userSession }: WithAuthenticationContextProps) => {
    if (!userSession) return null;
    return (
      <div className={container}>
        <h1 className={"my-8 text-3xl"}>Create your own!</h1>
        <CreateBlogForm />
      </div>
    );
  }
);

export default CreateBlogSection;
