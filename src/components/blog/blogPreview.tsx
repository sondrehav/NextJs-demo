import Link from "next/link";
import { ImageProps as ImageProps } from "types/imageProps";
import { Image as ImageComponent } from "components/images/image";

const BlogPreview = ({
  name,
  identifier,
  headerImage,
}: {
  name: string;
  identifier: string;
  headerImage?: ImageProps;
}) => {
  // m-2 shadow rounded-md transition-all ring-blue-500 ring-0 hover:ring-2 cursor-pointer overflow-hidden
  return (
    <Link href={`/${identifier}`}>
      <a
        className={
          "bg-gray-800 transition-all hover:bg-gray-700 shadow-sm overflow-hidden " +
          "hover:shadow-lg rounded-md ring-blue-500 ring-0 hover:ring-2 "
        }
      >
        <ImageComponent
          className={"object-cover h-48 overflow-hidden"}
          url={"/images/preview.jpg"}
        />
        <div className={"p-4"}>
          <h3 className={"text-1xl my-2"}>{name}</h3>
          <p className={"my-2 opacity-50"}>By someone...</p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPreview;
