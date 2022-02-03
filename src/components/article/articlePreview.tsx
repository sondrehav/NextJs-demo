import { ArticleListingType } from "lib/supabase/articleListing";
import { Image as ImageComponent } from "components/images/image";
import classNames from "classnames";
import { formatRelative } from "date-fns";
import { enGB } from "date-fns/locale";
import Link from "next/link";

const ArticlePreview = ({
  blogIdentifier,
  identifier,
  headerImage,
  isPublished,
  title,
  summary,
  createdAt,
}: ArticleListingType) => {
  // todo: sizes for ImageComponent

  return (
    <li className={"-mx-2 rounded-md"}>
      <Link href={`/${blogIdentifier}/${identifier}`}>
        <a
          className={
            "flex flex-row rounded-md py-2 px-2 transition-all bg-transparent hover:bg-gray-800 space-x-4"
          }
        >
          <ImageComponent
            className={classNames(
              "object-cover h-full rounded-md w-32 md:w-64 flex-grow-0 flex-shrink-0"
            )}
            {...headerImage}
            url={headerImage?.url ?? "/images/preview.jpg"}
          />
          <section
            className={classNames("flex-grow flex-shrink overflow-hidden")}
          >
            <h2 className={"my-2 font-bold truncate "} title={title}>
              {title}
            </h2>
            <h6>
              Created{" "}
              {formatRelative(new Date(createdAt), new Date(), {
                locale: enGB,
              })}
            </h6>
            <p className={"my-0 break-words hidden md:block"}>{summary}</p>
          </section>
        </a>
      </Link>
      <p className={"my-0 word-wrap md:hidden px-2"}>{summary}</p>
    </li>
  );
};

export default ArticlePreview;
