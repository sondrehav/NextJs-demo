import {ComponentType, Item, SingleLineContent} from "types/catalogue";
import {useRouter} from "next/router";
import {Fragment} from "react";
import Link from "next/link";
import findComponent from "lib/findComponent";

const LinkName = ({ item }: { item: Item }) => {
  const text = findComponent<SingleLineContent>(item.components ?? [], ComponentType.SingleLine, "title")?.text;
  return <>{text ?? item.name}</>
};

const LinkItem = ({ link }: { link: Item }) => {

  const currentPath = useRouter().asPath.split("#")[0];
  const linkPath = link.path?.replace("/web", "") ?? "";

  if(currentPath === linkPath) {
    return <span className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">
      <LinkName item={link}/>
    </span>;
  }

  return <Link href={linkPath || "/"} scroll={false}>
    <a className={"text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>
      <LinkName item={link}/>
    </a>
  </Link>;

};

const Navbar = ({ title, links }: { title: string, links: Item[] }) => {

  const currentPath = useRouter().asPath.split("#")[0];

  return (<nav className="sticky bg-gray-900 top-0 z-30 w-full shadow-lg border-b border-gray-800">
    <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 z-50">
      <div className="relative flex items-center justify-between h-16">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">

              {links
                .map(link => <LinkItem key={link.path} link={link}/>)}

            </div>
          </div>
        </div>
        <div>
          <h2 className={"text-lg"}>
            {title}
          </h2>
        </div>
      </div>
    </div>

    <div className="sm:hidden relative z-50" id="mobile-menu">
      <div className="px-2 pt-2 pb-3 space-y-1">


        {links
          .map(link => <Fragment key={link.path}>{link.path === `/web${currentPath === "/" ? "" : currentPath }` ?
            <span className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">
              <LinkName item={link}/>
            </span> : <Link href={link.path!.replace("/web", "")}>
              <a className={"text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}>
                <LinkName item={link}/>
              </a>
            </Link>}</Fragment>)}

      </div>
    </div>
  </nav>);
};

export default Navbar;