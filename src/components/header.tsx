import {Image as CImage} from "types/catalogue";
import {Image} from 'components/image';

const Header = ({ headerImage }: { headerImage?: CImage }) => {
  if(!headerImage) return null;
  return <div className={"relative max-h-32 md:max-h-64 w-full overflow-hidden"}>
    {headerImage && <Image className={"max-h-inherit w-full object-cover"} sizes={"100vw"} {...headerImage}/>}
  </div>
};

export default Header;