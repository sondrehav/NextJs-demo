import { ImageProps as ImageProps } from "types/imageProps";
import { Image } from "components/images/image";

const Header = ({ headerImage }: { headerImage?: ImageProps }) => {
  if (!headerImage) return null;
  return (
    <div className={"relative max-h-32 md:max-h-64 w-full overflow-hidden"}>
      {headerImage && (
        <Image
          className={"max-h-inherit w-full object-cover"}
          sizes={"100vw"}
          {...headerImage}
        />
      )}
    </div>
  );
};

export default Header;
