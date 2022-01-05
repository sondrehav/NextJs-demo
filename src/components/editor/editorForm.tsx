import { Input, TextArea } from "components/editor/inputs";
import { Controller, useForm, UseFormWatch } from "react-hook-form";
import { Image as ImageProps } from "types/image";
import { ChangeEventHandler, useEffect } from "react";
import { WatchObserver } from "react-hook-form/dist/types/form";
import ImageUploadEdit from "components/editor/imageUploadEdit";

type DocumentType = {
  images: ImageProps[];
  markdown: string;
  identifier: string;
  title: string;
};

const EditorForm = ({
  initial,
  onWatch,
}: {
  initial?: DocumentType;
  onWatch?: WatchObserver<DocumentType>;
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<DocumentType>({ defaultValues: initial });

  const onSubmit = (data: DocumentType) => console.log(data);

  const onImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {};

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  useEffect(() => {
    if (!onWatch) return;
    const subscription = watch(onWatch);
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form className={"w-full flex flex-col"} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name={"identifier"}
        render={({ field }) => <Input {...field} label={"Identifier"} />}
        control={control}
        rules={{ required: true, pattern: /^[\da-z][\da-z-]{2,14}[\da-z]$/ }}
        defaultValue={""}
      />

      <Controller
        name={"title"}
        render={({ field }) => <Input {...field} label={"Title"} />}
        control={control}
        rules={{ required: true, minLength: 3, maxLength: 64 }}
        defaultValue={""}
      />

      <Controller
        name={"markdown"}
        render={({ field }) => (
          <TextArea className={"h-96"} {...field} label={"Markdown"} />
        )}
        control={control}
        rules={{ required: true }}
        defaultValue={""}
      />

      <ImageUploadEdit />
    </form>
  );
};

export default EditorForm;
