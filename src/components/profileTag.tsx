import { Image } from "components/images/image";
import { ImageProps as ImageProps } from "types/imageProps";
import classNames from "classnames";
import { HTMLProps } from "react";
import Link from "next/link";

export const ArticleProfileTag = ({
  name,
  contact,
  image,
  ...rest
}: {
  name: string;
  contact?: string;
  image?: ImageProps;
} & HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...rest}
      className={classNames(
        "flex flex-row items-center space-x-2 sm:space-x-4",
        rest.className
      )}
    >
      {image && (
        <div
          className={
            "rounded-full flex-grow-0 flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 border-2 border-gray-800 shadow-lg overflow-hidden"
          }
        >
          <Image
            className={"w-full h-full object-cover"}
            sizes={"(max-width: 384px) 48px, 32px"}
            {...(image as ImageProps)}
          />
        </div>
      )}
      <div className={"leading-none sm:leading-normal flex-1"}>
        {name && <h3 className={"text-sm sm:text-base"}>Av {name}</h3>}
        {contact && (
          <a href={`mailto:${contact}`}>
            <span className={"text-gray-500 text-xs sm:text-sm"}>
              {contact}
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

export const ProfileTag = ({
  name,
  image,
  ...rest
}: {
  name: string;
  image?: ImageProps;
} & HTMLProps<HTMLAnchorElement>) => {
  return (
    <Link href={"/user-details"}>
      <a
        {...rest}
        className={classNames(
          "flex flex-row items-center space-x-2 sm:space-x-4 group",
          rest.className
        )}
      >
        {image && (
          <div
            className={
              "rounded-full flex-grow-0 flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 border-2 " +
              "border-gray-800 shadow-lg overflow-hidden transition-all group-hover:border-gray-400"
            }
          >
            <Image
              className={"w-full h-full object-cover"}
              sizes={"(max-width: 384px) 48px, 32px"}
              {...(image as ImageProps)}
            />
          </div>
        )}
        {name && (
          <h3
            className={
              "text-sm sm:text-base leading-none sm:leading-normal flex-1 text-gray-400 transition-all group-hover:text-white"
            }
          >
            {name}
          </h3>
        )}
      </a>
    </Link>
  );
};
