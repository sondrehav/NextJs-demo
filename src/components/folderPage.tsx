import {ComponentType, Item, RichTextContent} from "types/catalogue";
import Layout from "components/layout";
import findComponent from "lib/findComponent";
import ContentTransformer, {ContentTransformerProps} from "components/contentTransformer";
import ChildPageView from "components/childPageView";
import Link from "next/link";

const FolderPage = (item: Item) => {

  const content = findComponent<RichTextContent>(item.components ?? [] , ComponentType.RichText, "content")?.json;

  return (<Layout item={item}>

    <div className={"sm:container mx-2 md:mx-auto my-6 overflow-x-hidden"}>
      {content && <ContentTransformer json={content as ContentTransformerProps["json"]}/>}
    </div>

    <div className={"sm:container mx-2 md:mx-auto my-6 overflow-x-hidden grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8"}>
      {item.children?.map(child => <Link key={child.id} href={child.path!.replace("/web", "")} passHref><ChildPageView child={child}/></Link>)}
    </div>

  </Layout>);
};

export default FolderPage;