import classNames from "classnames";
import { ComponentProps, HTMLProps } from "react";

const TextArea = (props: ComponentProps<"textarea">) => {
  return (
    <textarea
      {...props}
      className={classNames(
        "resize-none",
        "block",
        "w-full",
        "text-base",
        "font-normal",
        "text-gray-700",
        "bg-white bg-clip-padding",
        "border border-solid border-gray-300",
        "rounded",
        "transition",
        "ease-in-out",
        "m-0",
        "focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none",
        "p-4",
        props.className
      )}
    />
  );
};

export default TextArea;
