import { PropsWithChildren } from "react";

import Navbar from "components/navbar";
import Header from "components/header";
import Head from "next/head";
import ChevronLeft from "icons/chevron-left.svg";
import Link from "next/link";
import classNames from "classnames";
import { container } from "lib/classes";
import { ImageProps as ImageProps } from "types/imageProps";
import LinkItemProps from "types/linkItemProps";

const Layout = ({
  children,
  links,
  title,
}: PropsWithChildren<{ links?: LinkItemProps[]; title?: string }>) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar title={title} links={links} />
      {children}
    </>
  );
};

export const PageLayout = ({
  headerImage,
  links,
  title,
  parentPath,
  children,
}: PropsWithChildren<{
  headerImage?: ImageProps;
  links: LinkItemProps[];
  title: string;
  parentPath?: LinkItemProps;
}>) => {
  return (
    <>
      <Header headerImage={headerImage} />
      <Layout links={links} title={title} />
      {parentPath && (
        <Link href={parentPath.path}>
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
            <span>{parentPath.label}</span>
          </a>
        </Link>
      )}
      {children}
    </>
  );
};

export default Layout;
