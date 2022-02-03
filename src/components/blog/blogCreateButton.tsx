import classNames from "classnames";
import PlusIcon from "icons/plus.svg";

const BlogCreateButton = () => {
  return (
    <button
      className={
        "m-4 bg-gray-800 transition-all hover:bg-gray-700 shadow-sm overflow-hidden relative " +
        "hover:shadow-lg rounded-md ring-blue-500 ring-0 hover:ring-2 cursor-pointer w-32"
      }
    >
      <PlusIcon
        width={24}
        height={24}
        className={classNames(
          "fill-current absolute transition-all top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        )}
      />
    </button>
  );
};

export default BlogCreateButton;
