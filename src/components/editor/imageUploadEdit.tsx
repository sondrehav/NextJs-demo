import { forwardRef, Fragment, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import ImageIcon from "icons/image.svg";
import { Image as ImageProps } from "types/image";
import dynamic from "next/dynamic";
import { Button, Input } from "components/editor/inputs";
import { Controller, useForm } from "react-hook-form";
import { withImageContextEditorContext } from "components/images/imagePreviewProvider";

const Modal = dynamic(() => import("components/modal"), { ssr: false });
type FileMeta = { file: File; identifier: string; objectUrl: string };
type FormData = Pick<FileMeta, "identifier">;

const ImageModal = forwardRef<
  HTMLFormElement,
  {
    onSave: (meta: FormData) => any;
    onDelete: () => any;
    fileMeta: Partial<Pick<FileMeta, "identifier" | "objectUrl">>;
    existingIds: string[];
  }
>(({ fileMeta, onDelete, onSave, existingIds }, ref) => {
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
            required: "The image needs an unique identifier",
            pattern: /^[\da-z][\da-z-]{2,64}[\da-z]$/,
            validate: (value) =>
              existingIds.indexOf(value) < 0 || fileMeta.identifier === value
                ? true
                : "An image with this identifier already exists",
          }}
          defaultValue={""}
        />

        <div className={"flex flex-row justify-between items-center my-4"}>
          <Button label={"Save"} type={"submit"} />
          <Button
            label={"Delete"}
            variant={"secondary"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
          />
        </div>
      </form>
    </div>
  );
});
ImageModal.displayName = "ImageModal";

const createIdentifier = (
  identifier: string,
  existing: Set<string>
): string => {
  if (existing.has(identifier)) {
    const id = identifier + "-" + Math.random().toString(36).substring(2, 10);
    return createIdentifier(id, existing);
  }
  return identifier;
};

const ImageUploadEdit = withImageContextEditorContext(({ setPreviews }) => {
  const [files, setFiles] = useState<FileMeta[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editFileMeta, setEditFileMeta] = useState<FileMeta | null>(null);

  const onDropAccepted = (acceptedFiles: File[]) => {
    const existingIds = new Set(files.map((v) => v.identifier));
    const newFiles = acceptedFiles.map<FileMeta>((file) => {
      const identifier = createIdentifier(file.name.split(".")[0], existingIds);
      const objectUrl = URL.createObjectURL(file);
      return {
        file,
        identifier,
        objectUrl,
      };
    });
    const previews = newFiles.reduce(
      (a, v) => ({ ...a, [v.identifier]: { url: v.objectUrl } }),
      {}
    );
    setPreviews((old) => {
      return {
        ...old,
        ...previews,
      };
    });
    setFiles((old) => old.concat(newFiles));
  };

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

  const onSaveImage = (e: FormData) => {
    if (!editFileMeta)
      throw new Error(
        "'editFileMeta' was undefined. This should not be possible.."
      );
    setFiles((files) => [
      ...files.map((file) => {
        if (file.identifier === editFileMeta.identifier) {
          return { ...file, identifier: e.identifier };
        }
        return file;
      }),
    ]);
    setPreviews(({ [editFileMeta.identifier]: _, ...old }) => ({
      ...old,
      [e.identifier]: { url: editFileMeta.objectUrl },
    }));
    setShowModal(false);
  };

  const onDeleteImage = (e: FileMeta) => {
    setFiles((files) => files.filter((s) => s.identifier !== e.identifier));
    setPreviews(({ [e.identifier]: _, ...old }) => old);
    URL.revokeObjectURL(e.objectUrl);
    setShowModal(false);
  };

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
                "absolute bottom-0 block bg-gray-100 bg-opacity-50 text-black w-full p-2 truncate text-center font-bold"
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
          onSave={onSaveImage}
          onDelete={() => editFileMeta && onDeleteImage(editFileMeta)}
          existingIds={files.map((file) => file.identifier)}
        />
      </Modal>
    </>
  );
});

export default ImageUploadEdit;
