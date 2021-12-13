import {PropsWithChildren} from 'react';
import {ComponentType, ImageContent, Item, ItemRelationsContent, Maybe, SingleLineContent} from "types/catalogue";
import Navbar from "components/navbar";
import Header from "components/header";
import findComponent from "lib/findComponent";
import Head from "next/head";
import ChevronLeft from "icons/chevron-left.svg";
import Link from "next/link";
import classNames from "classnames";
import {container} from "lib/classes";

const Layout = ({ children, item, commonLinks }: PropsWithChildren<{ item: Item, commonLinks: Maybe<Item> }>) => {

  const { components } = item;

  const links = findComponent<ItemRelationsContent>(commonLinks?.components ?? [], ComponentType.ItemRelations, "links")?.items ?? [];
  const title= findComponent<SingleLineContent>(components ?? [], ComponentType.SingleLine, "title")?.text ?? item.name ?? "";
  const headerImage = findComponent<ImageContent>(components ?? [], ComponentType.Images, "header-image")?.firstImage ?? undefined;
  const parent = item.parent ? {
      parentPath: item.parent.path,
      title: findComponent<SingleLineContent>(item.parent?.components ?? [], ComponentType.SingleLine, "title")?.text ?? item.parent?.name
    } : null;
  return (
    <>
      <Head>
        <title>Bloggete blog | {title}</title>
      </Head>
      <Header headerImage={headerImage}/>
      <Navbar links={links} title={title}/>
      {parent && <Link href={parent.parentPath?.replace("/web", "") ?? ""}>
        <a className={classNames(container, "my-8 flex flex-row items-center space-x-2 text-gray-500 transition-all hover:text-gray-200 group")}>
          <ChevronLeft className={"fill-current transform scale-90 group-hover:scale-100 cursor-pointer"} width={16} height={16}/>
          <span>{parent?.title ?? "Tilbake"}</span>
        </a>
      </Link>}
      {children}
    </>
  );
};

export default Layout;