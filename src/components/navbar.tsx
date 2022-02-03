import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import Link from "next/link";
import Bars from "icons/bars.svg";
import classNames from "classnames";
import { container, navButton } from "lib/classes";
import { AuthenticationModal, withUserInfo } from "components/authentication";
import { ProfileTag } from "components/profileTag";
import dynamic from "next/dynamic";
import LinkItemProps from "types/linkItemProps";

const Modal = dynamic(import("components/modal"), { ssr: false });

const LinkItem = ({ link }: { link: LinkItemProps }) => {
  const currentPath = useRouter().asPath.split("#")[0];
  const linkPath = link.path?.replace("/web", "") ?? "";

  if (currentPath === linkPath) {
    return (
      <span
        className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium"
        aria-current="page"
      >
        {link.label}
      </span>
    );
  }

  return (
    <Link href={linkPath || "/"} scroll={false}>
      <a className={navButton}>{link.label}</a>
    </Link>
  );
};

const SignInButton = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className={navButton} onClick={() => setShowModal(true)}>
        Sign in
      </button>
      <Modal visible={showModal} onBgClick={() => setShowModal(false)}>
        <AuthenticationModal />
      </Modal>
    </>
  );
};

const AuthInfo = withUserInfo(({ userInfo }) => {
  if (userInfo === null) return <SignInButton />;

  return <ProfileTag name={userInfo.name} image={{ url: userInfo.picture }} />;
});

const Navbar = ({
  title = "",
  links = [],
}: {
  title?: string;
  links?: { label: string; path: string }[];
}) => {
  const currentPath = useRouter().asPath.split("#")[0];
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <nav className="sticky bg-gray-900 top-0 z-30 w-full shadow-lg border-b border-gray-800">
        <div className={classNames(container, "relative px-0 z-50")}>
          <div className="relative flex items-center justify-between h-16 space-x-4">
            <button
              type="button"
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setExpanded(!expanded)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars
                width={24}
                height={24}
                className={"block h-6 w-6 fill-current"}
              />
            </button>

            <div
              className={
                "flex-grow-1 flex-shrink-1 flex justify-between items-center max-w-full overflow-x-hidden truncate"
              }
            >
              <div className="hidden sm:block flex-grow-0 flex-shrink-1 relative overflow-x-auto flex space-x-4 text-center items-center whitespace-nowrap h-full">
                <div className="flex space-x-4 text-center items-center whitespace-nowrap w-full h-full">
                  {links.map((link) => (
                    <LinkItem key={link.path} link={link} />
                  ))}
                </div>
              </div>

              <h2
                className={
                  "text-lg flex-grow-1 flex-shrink-1 sm:flex-grow-0 sm:flex-shrink-0 overflow-x-hidden truncate ml-0 sm:ml-2"
                }
                title={title}
              >
                {title}
              </h2>
            </div>

            <div className={"flex flex-row items-center space-x-1"}>
              <AuthInfo />
            </div>
          </div>
        </div>

        <div
          className={classNames(
            "sm:hidden relative z-50 transition-all overflow-hidden shadow border-t border-gray-800 h-min-content",
            { "max-h-64": expanded, "max-h-0": !expanded }
          )}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <Link href={link.path} key={link.path}>
                <a
                  className={
                    "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  }
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
