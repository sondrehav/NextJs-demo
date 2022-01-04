import { PropsWithChildren } from "react";
import {
  ComponentType,
  Image,
  ImageContent,
  Item,
  ItemRelationsContent,
  Maybe,
  SingleLineContent,
} from "types/catalogue";
import Navbar, { LinkItemProps } from "components/navbar";
import Header from "components/header";
import findComponent from "lib/findComponent";
import Head from "next/head";
import ChevronLeft from "icons/chevron-left.svg";
import Link from "next/link";
import classNames from "classnames";
import { container } from "lib/classes";

const Layout = ({
  children,
  links,
  title,
}: PropsWithChildren<{ links: LinkItemProps[]; title: string }>) => {
  return (
    <>
      <Head>
        <title>Bloggete blog | {title}</title>
      </Head>
      <Navbar links={links} title={title} />
      {children}
    </>
  );
};

export const PageLayout = ({
  item,
  links,
  children,
}: PropsWithChildren<{
  links: LinkItemProps[];
  item: Item;
  header?: Image;
}>) => {
  const { components } = item;

  const title =
    findComponent<SingleLineContent>(
      components ?? [],
      ComponentType.SingleLine,
      "title"
    )?.text ??
    item.name ??
    "";

  const headerImage =
    findComponent<ImageContent>(
      components ?? [],
      ComponentType.Images,
      "header-image"
    )?.firstImage ?? undefined;

  const parent = item.parent
    ? {
        parentPath: item.parent.path,
        title:
          findComponent<SingleLineContent>(
            item.parent?.components ?? [],
            ComponentType.SingleLine,
            "title"
          )?.text ?? item.parent?.name,
      }
    : null;
  return (
    <>
      <Header headerImage={headerImage} />
      <Layout links={links} title={title} />
      {parent && (
        <Link href={parent.parentPath?.replace("/web", "") ?? ""}>
          <a
            className={classNames(
              container,
              "my-8 flex flex-row items-center space-x-2 text-gray-500 transition-all hover:text-gray-200 group"
            )}
          >
            <ChevronLeft
              className={
                "fill-current transform scale-90 group-hover:scale-100 cursor-pointer"
              }
              width={16}
              height={16}
            />
            <span>{parent?.title ?? "Tilbake"}</span>
          </a>
        </Link>
      )}
      {children}
    </>
  );
};

export default Layout;
