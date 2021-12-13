import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetServerSidePropsType
} from "next";
import {ParsedUrlQuery} from "querystring";
import fetchPage, {fetchPageList} from "lib/fetch/page";
import {BooleanContent, ComponentType, Item, Maybe} from "types/catalogue";
import AlbumPage from "components/albumPage";
import findComponent from "lib/findComponent";

interface StaticPathType extends ParsedUrlQuery { path: string[] }
type StaticPropsType = { item: Item, commonLinks: Maybe<Item> }

export const getStaticPaths = async (context: GetStaticPathsContext): Promise<GetStaticPathsResult<StaticPathType>> => {

  const res = await fetchPageList();
  if(!res.search) {
    return {
      paths:  [],
      fallback: "blocking"
    }
  }

  const pages = (res.search.edges ?? []).map(edge => edge.node.path
    .replace(/\/web(?=(\/|$))/, "")
    .split("/")
    .filter(s => s !== "")
  );

  return {
    paths: pages.map(path => ({
      params: {
        path
      }
    })),
    fallback: "blocking"
  }
};

export const getStaticProps = async (context: GetStaticPropsContext<StaticPathType>): Promise<GetStaticPropsResult<StaticPropsType>> => {

  const path = context.params?.path ? `/web/${context.params?.path.join("/")}` : "/web";

  const res = await fetchPage(path);
  const commonLinks = res.commonLinks;

  if(!res.catalogue) {
    return {
      notFound: true,
      revalidate: 60
    }
  }

  const listChildren = findComponent<BooleanContent>(res.catalogue.components ?? [] , ComponentType.Boolean, "list-children")?.value;
  if(listChildren !== true) {
    res.catalogue.children = null;
  }

  if(path === "/web") {
    res.catalogue.parent = null;
  }

  return {
    props: { item: res.catalogue, commonLinks },
    revalidate: 60
  }
};


export default function DynamicPage(props: InferGetServerSidePropsType<typeof getStaticProps>) {

  const shape = props.item.shape.identifier;

  if(shape === "album") {
    return <AlbumPage catalogue={props.item} commonLinks={props.commonLinks}/>
  }

  return <h1>Unknown shape: {shape}</h1>;

}