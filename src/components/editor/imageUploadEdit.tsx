import { forwardRef, Fragment, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import ImageIcon from "icons/image.svg";
import { Image as ImageProps } from "types/image";
import dynamic from "next/dynamic";
import { Button, Input } from "components/editor/inputs";
import { Controller, useForm } from "react-hook-form";

const Modal = dynamic(() => import("components/modal"), { ssr: false });
type FileMeta = { file: File; identifier: string; objectUrl: string };

const ImageModal = forwardRef<
  HTMLFormElement,
  {
    onSave: (meta: Partial<FileMeta>) => any;
    onDelete: () => any;
    fileMeta: Partial<Pick<FileMeta, "identifier" | "objectUrl">>;
  }
>(({ fileMeta, onDelete, onSave }, ref) => {
  type FormData = Pick<FileMeta, "identifier">;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { identifier: fileMeta.identifier },
  });

  const onSubmit = (data: FormData) => {
    onSave(data);
  };

  return (
    <div className={"flex flex-row justify-center items-center h-full"}>
      <form
        className={"w-96 bg-gray-800 p-8 shadow flex flex-col rounded-lg"}
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className={"text-2xl my-2 block"}>Edit image meta</h3>

        {fileMeta.objectUrl && (
          <img
            src={fileMeta.objectUrl}
            className={"w-full h-64 my-4 object-cover shadow rounded-md"}
          />
        )}

        <Controller
          name={"identifier"}
          render={({ field }) => (
            <Input
              {...field}
              label={"Identifier"}
              errorMessage={errors.identifier?.message}
              showError={!!errors.identifier}
            />
          )}
          control={control}
          rules={{
            required: true,
            pattern: /^[\da-z][\da-z-]{2,64}[\da-z]$/,
          }}
          defaultValue={""}
        />

        <div className={"flex flex-row justify-between items-center my-4"}>
          <Button label={"Save"} type={"submit"} />
          <Button
            label={"Delete"}
            variant={"secondary"}
            onClick={() => onDelete()}
          />
        </div>
      </form>
    </div>
  );
});
ImageModal.displayName = "ImageModal";

const ImageUploadEdit = () => {
  const [files, setFiles] = useState<FileMeta[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editFileMeta, setEditFileMeta] = useState<FileMeta | null>(null);

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setFiles((old) => {
      return [
        ...old,
        ...acceptedFiles.map<FileMeta>((file) => ({
          file,
          identifier: file.name.split(".")[0],
          objectUrl: URL.createObjectURL(file),
        })),
      ];
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    accept: ["image/png", "image/jpeg", "image/webp"],
    multiple: true,
  });

  useEffect(() => {
    return () => {
      files.forEach(({ objectUrl }) => URL.revokeObjectURL(objectUrl));
    };
  }, []);

  return (
    <>
      <label className={"text-xl my-2"}>Images</label>
      <div className={"flex flex-row flex-wrap -mx-2 items-center"}>
        {files.map((file) => (
          <div
            key={file.objectUrl}
            className={
              "relative w-48 h-32 m-2 shadow rounded-md transition-all ring-blue-500 ring-0 hover:ring-2 cursor-pointer overflow-hidden"
            }
            onClick={() => {
              setEditFileMeta(file);
              setShowModal(true);
            }}
          >
            <img
              src={file.objectUrl}
              className={"w-full h-full object-cover"}
            />
            <h4
              className={
                "absolute bottom-0 block bg-gray-100 bg-opacity-50 text-black w-full p-2 truncate text-center"
              }
            >
              {file.identifier}
            </h4>
          </div>
        ))}
        <div
          {...getRootProps()}
          className={classNames(
            "relative w-48 h-32 m-2 shadow rounded-md bg-gray-700 transition-all ring-blue-500 ring-0 hover:ring-2 cursor-pointer",
            { "ring-2": isDragActive }
          )}
        >
          <input {...getInputProps()} />
          <ImageIcon
            width={24}
            height={24}
            className={classNames(
              "fill-current absolute transition-all top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            )}
          />
        </div>
      </div>
      <Modal visible={showModal} onBgClick={() => setShowModal(false)}>
        <ImageModal
          key={editFileMeta?.objectUrl}
          fileMeta={{
            identifier: editFileMeta?.identifier,
            objectUrl: editFileMeta?.objectUrl,
          }}
          onSave={(file) => {
            setShowModal(false);
          }}
          onDelete={() => {
            setShowModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default ImageUploadEdit;
