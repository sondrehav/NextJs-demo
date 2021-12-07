import {Image as CImage} from "types/catalogue";
import {Image} from 'components/image';
import {container} from "lib/classes";

const Header = ({ title, headerImage }: { title?: string, headerImage?: CImage }) => {


  return <div className={"relative max-h-32 md:max-h-64 w-full overflow-hidden"}>
    {title && <div className={"absolute bottom-0 md:mx-auto z-40 text-4xl p-3 z-50 w-full overflow-hidden truncate bg-black bg-opacity-30 shadow backdrop-filter backdrop-blur-sm"}>
      <h1 className={container}>{title}</h1>
    </div>}
    <div className={"overflow-hidden max-h-inherit"}>
      {headerImage && <Image className={"max-h-inherit w-full object-cover"} sizes={"(max-width: 600px) 480px, 100vw"} {...headerImage}/>}
    </div>
  </div>
};

export default Header;