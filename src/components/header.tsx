import {Image as CImage} from "types/catalogue";
import {Image, Props as ImageProps} from '@crystallize/react-image';
import {container} from "lib/classes";

const Header = ({ title, headerImage }: { title?: string, headerImage?: CImage }) => {
  return <div className={"relative max-h-32 md:max-h-64 w-full overflow-hidden"}>
    {title && <div className={"absolute bottom-0 md:mx-auto z-40 text-4xl p-3 z-50 w-full overflow-hidden truncate bg-black bg-opacity-10 shadow"}>
      <h1 className={container}>{title}</h1>
    </div>}
    <div className={"overflow-hidden"}>
      {headerImage && <>
        <Image sizes={"(max-width: 1920px) 90vw, 700px"} {...headerImage as ImageProps}/>
      </>}
    </div>
  </div>
};

export default Header;