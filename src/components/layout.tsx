import {PropsWithChildren} from 'react';
import {ComponentType, ImageContent, Item, ItemRelationsContent, SingleLineContent} from "types/catalogue";
import Navbar from "components/navbar";
import Header from "components/header";
import findComponent from "lib/findComponent";
import Head from "next/head";

const mapLinks = (item: Item): Item[] => {
  if(item.shape.identifier !== "common-links") {
    return [ item ];
  }
  return findComponent<ItemRelationsContent>(item.components ?? [], ComponentType.ItemRelations, "links")?.items ?? [];
}

const Layout = ({ children, item }: PropsWithChildren<{ item: Item }>) => {

  const { components } = item;

  const links = findComponent<ItemRelationsContent>(components ?? [], ComponentType.ItemRelations, "links")?.items
    ?.flatMap(mapLinks) ?? [];
  const title= findComponent<SingleLineContent>(components ?? [], ComponentType.SingleLine, "title")?.text ?? name ?? "";
  const headerImage = findComponent<ImageContent>(components ?? [], ComponentType.Images, "header-image")?.firstImage ?? undefined;

  return (
    <>
      <Head>
        <title>NextJs demo | {title}</title>
      </Head>
      <Header headerImage={headerImage}/>
      <Navbar links={links} title={title}/>
      {children}
    </>
  );
};

export default Layout;