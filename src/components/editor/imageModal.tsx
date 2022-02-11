import { FormEventHandler, forwardRef } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import SmallPreview from "components/editor/smallPreview";
import { Button, Input } from "components/editor/inputs";
import { FileMeta } from "components/editor/imageUploadEdit";
import TransformController from "components/editor/transformController";
import {
  identifierPattern,
  sanitizeIdentifier,
} from "components/editor/common";

const InnerModal = forwardRef<
  HTMLFormElement,
  {
    onSave: (meta: FileMeta) => any;
    onDelete: () => any;
    fileMeta: FileMeta | null;
  }
>((props, ref) => {
  const formProps = useFormContext();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    formProps.handleSubmit(props.onSave)(e);
  };

  return (
    <div className={"flex flex-row justify-center items-center h-full"}>
      <form
        className={"w-96 bg-gray-800 p-8 shadow flex flex-col rounded-lg"}
        ref={ref}
        onSubmit={handleSubmit}
      >
        <h3 className={"text-2xl my-2 block"}>Edit image meta</h3>

        {props.fileMeta?.identifier && (
          <SmallPreview
            image={props.fileMeta.data}
            className={"w-full h-64 my-4 object-cover shadow rounded-md"}
          />
        )}
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
              errorMessage={formProps.formState.errors.identifier?.message}
              showError={!!formProps.formState.errors.identifier}
            />
          )}
          rules={{
            required: "The image needs an unique identifier",
            pattern: identifierPattern,
          }}
        />

        <div className={"flex flex-row justify-between items-center my-4"}>
          <Button label={"Save"} type={"submit"} />
          <Button
            label={"Delete"}
            variant={"secondary"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.onDelete();
            }}
          />
        </div>
      </form>
    </div>
  );
});
InnerModal.displayName = "InnerModal";

const ImageModal = forwardRef<
  HTMLFormElement,
  {
    onSave: (meta: FileMeta) => any;
    onDelete: () => any;
    fileMeta: FileMeta | null;
  }
>(({ fileMeta, onDelete, onSave }, ref) => {
  const formProps = useForm<FileMeta>({
    defaultValues: { identifier: fileMeta?.identifier ?? "" },
    reValidateMode: "onSubmit",
  });

  const onSubmit = (data: FileMeta) => {
    try {
      onSave(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        formProps.setError("identifier", { message: e.message });
        return;
      }
      throw e;
    }
  };

  return (
    <FormProvider {...formProps}>
      <InnerModal
        onSave={onSubmit}
        onDelete={onDelete}
        fileMeta={fileMeta}
        ref={ref}
      />
    </FormProvider>
  );
});
ImageModal.displayName = "ImageModal";

export default ImageModal;
