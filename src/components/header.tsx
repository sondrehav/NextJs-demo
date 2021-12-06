import {Image as CImage} from "types/catalogue";
import {Image, Props as ImageProps} from '@crystallize/react-image';

const Header = ({ title, headerImage }: { title?: string, headerImage?: CImage }) => {
  return <div className={"h-64 w-full overflow-hidden"}>
    <div className={"relative"}>
      {title && <h1 className={"absolute mx-2 md:mx-auto z-40 text-4xl bottom-0 p-3 z-50"}>{title}</h1>}
      {headerImage && <>
        <Image sizes={"(max-width: 1920px) 90vw, 700px"} {...headerImage as ImageProps}/>
      </>}
    </div>
  </div>
};

export default Header;