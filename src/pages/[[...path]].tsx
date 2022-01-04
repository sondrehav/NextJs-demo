import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetServerSidePropsType,
} from "next";
import { ParsedUrlQuery } from "querystring";
import fetchPage, { fetchPageList } from "lib/fetch/page";
import {
  BooleanContent,
  ComponentType,
  Item,
  ItemRelationsContent,
  Maybe,
  SingleLineContent,
} from "types/catalogue";
import AlbumPage from "components/albumPage";
import findComponent from "lib/findComponent";
import { LinkItemProps } from "components/navbar";

interface StaticPathType extends ParsedUrlQuery {
  path: string[];
}
type StaticPropsType = { item: Item; links: LinkItemProps[] };

const getLinkLabel = (item: Item) => {
  const text = findComponent<SingleLineContent>(
    item.components ?? [],
    ComponentType.SingleLine,
    "title"
  )?.text;
  return text ?? item.name ?? "";
};

export const getStaticPaths = async (
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult<StaticPathType>> => {
  const res = await fetchPageList();
  if (!res.search) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const pages = (res.search.edges ?? []).map((edge) =>
    edge.node.path
      .replace(/\/web(?=(\/|$))/, "")
      .split("/")
      .filter((s) => s !== "")
  );

  return {
    paths: pages.map((path) => ({
      params: {
        path,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<StaticPathType>
): Promise<GetStaticPropsResult<StaticPropsType>> => {
  const path = context.params?.path
    ? `/web/${context.params?.path.join("/")}`
    : "/web";

  const res = await fetchPage(path);
  const links =
    findComponent<ItemRelationsContent>(
      res.commonLinks?.components ?? [],
      ComponentType.ItemRelations,
      "links"
    )?.items?.map((link) => ({
      label: getLinkLabel(link),
      path: link.path?.replace("/web", "") ?? "",
    })) ?? [];

  if (!res.catalogue) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  const listChildren = findComponent<BooleanContent>(
    res.catalogue.components ?? [],
    ComponentType.Boolean,
    "list-children"
  )?.value;
  if (listChildren !== true) {
    res.catalogue.children = null;
  }

  if (path === "/web") {
    res.catalogue.parent = null;
  }

  return {
    props: { item: res.catalogue, links },
    revalidate: 60,
  };
};

export default function DynamicPage(
  props: InferGetServerSidePropsType<typeof getStaticProps>
) {
  const shape = props.item.shape.identifier;

  if (shape === "album") {
    return <AlbumPage catalogue={props.item} links={props.links} />;
  }

  return <h1>Unknown shape: {shape}</h1>;
}
