import { useState } from "react";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import ImageIcon from "icons/image.svg";
import { ArticleProps } from "types/image";
import dynamic from "next/dynamic";
import { useFieldArray, useFormContext } from "react-hook-form";
import SmallPreview from "components/editor/smallPreview";
import ImageModal from "components/editor/imageModal";
import { sanitizeIdentifier } from "components/editor/common";

const Modal = dynamic(() => import("components/modal"), { ssr: false });

export type FileMeta = ArticleProps["images"][0];

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

const ImageUploadEdit = () => {
  const [showModal, setShowModal] = useState(false);
  const [editFileMeta, setEditFileMeta] = useState<[number, FileMeta] | null>(
    null
  );

  const { register, getValues } = useFormContext();
  const { fields, append, remove, update } = useFieldArray<
    ArticleProps,
    "images"
  >({
    name: "images",
  });

  const onDropAccepted = (acceptedFiles: File[]) => {
    const existingIds = new Set(fields.map((v) => v.identifier));
    const images: ArticleProps["images"] = acceptedFiles.map((file) => {
      const identifier = createIdentifier(
        sanitizeIdentifier(file.name.split(".")[0]),
        existingIds
      );
      return {
        data: file,
        identifier,
      };
    });
    append(images);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    accept: ["image/png", "image/jpeg", "image/webp"],
    multiple: true,
  });

  const onSaveImage = (e: FileMeta) => {
    if (!editFileMeta)
      throw new Error(
        "'editFileMeta' was undefined. This should not be possible.."
      );

    const [index, m] = editFileMeta;

    if (
      e.identifier !== m.identifier &&
      fields.map((field) => field.identifier).indexOf(e.identifier) >= 0
    ) {
      throw new Error(`Field with id '${e.identifier}' already exists.`);
    }
    const newFileMeta: FileMeta = { ...m, identifier: e.identifier };
    update(index, newFileMeta);
    setEditFileMeta([index, newFileMeta]);
    setShowModal(false);
  };

  const onDeleteImage = ([index, meta]: [number, FileMeta]) => {
    remove(index);
    setShowModal(false);
  };

  return (
    <>
      <label className={"text-xl my-2"}>Images</label>
      <div className={"flex flex-row flex-wrap -mx-2 items-center"}>
        {fields.map((field, index) => (
          <div
            key={field.identifier}
            className={
              "relative w-48 h-32 m-2 shadow rounded-md transition-all ring-blue-500 ring-0 hover:ring-2 cursor-pointer overflow-hidden"
            }
            onClick={() => {
              setEditFileMeta([index, field]);
              setShowModal(true);
            }}
          >
            <input
              className={"hidden"}
              key={field.identifier} // important to include key with field's id
              {...register(`images.${index}.identifier`)}
            />
            <SmallPreview
              className={"w-full h-full object-cover"}
              image={field.data}
            />
            <h4
              className={
                "absolute bottom-0 block bg-gray-100 bg-opacity-50 text-black w-full p-2 truncate text-center font-bold"
              }
            >
              {field.identifier}
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
          key={editFileMeta?.[1].identifier}
          fileMeta={editFileMeta?.[1] ?? null}
          onSave={onSaveImage}
          onDelete={() => editFileMeta && onDeleteImage(editFileMeta)}
        />
      </Modal>
    </>
  );
};

export default ImageUploadEdit;
