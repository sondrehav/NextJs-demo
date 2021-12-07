import {ComponentType, Item, SingleLineContent} from "types/catalogue";
import {useRouter} from "next/router";
import {Fragment, useState} from "react";
import Link from "next/link";
import findComponent from "lib/findComponent";
import GithubSquare from "icons/github-square.svg";
import classNames from "classnames";
import {container} from "lib/classes";

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
  const [ expanded, setExpanded ] = useState(false);

  return (<nav className="sticky bg-gray-900 top-0 z-30 w-full shadow-lg border-b border-gray-800">
    <div className={classNames(container, "relative px-0 z-50")}>
      <div className="relative flex items-center justify-between h-16">

        <button type="button"
                className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu" aria-expanded="false"
                onClick={() => setExpanded(!expanded)}
        >
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

        <div className={"flex-grow-1 flex-shrink-1 flex justify-between items-center max-w-full overflow-x-hidden truncate"}>

            <div className="hidden sm:block flex-grow-0 flex-shrink-1 relative overflow-x-auto flex space-x-4 text-center items-center whitespace-nowrap h-full">
              <div className="flex space-x-4 text-center items-center whitespace-nowrap w-full h-full">
                {links.map(link => <LinkItem key={link.path} link={link}/>)}
              </div>
            </div>

            <h2 className={"text-lg flex-grow-1 flex-shrink-1 sm:flex-grow-0 sm:flex-shrink-0 overflow-x-hidden truncate ml-0 sm:ml-2"} title={title}>
              {title}
            </h2>

        </div>

        <a className={"flex-grow-0 flex-shrink-0 p-2"} href={"https://github.com/sondrehav/NextJs-demo"}>
          <GithubSquare className={"fill-current transform transition-all scale-90 hover:scale-100 cursor-pointer"} width={32} height={32}/>
        </a>

      </div>
    </div>

    <div className={classNames("sm:hidden relative z-50 transition-all overflow-hidden shadow border-t border-gray-800 h-min-content", {"max-h-64": expanded, "max-h-0": !expanded})} id="mobile-menu">
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