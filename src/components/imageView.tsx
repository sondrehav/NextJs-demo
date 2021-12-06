import {Image, ImageContent} from "types/catalogue";
import {Image as CImage, Props as ImageProps} from "@crystallize/react-image";

const ImageView = ({ images }: { images: Image[] }) => {

  return (<div className={"my-8 "}>{
    images.map(image => <div className={"overflow-hidden rounded-xl shadow-lg my-8"} key={image.url}>
      <CImage sizes={"(max-width: 1920px) 90vw, 700px"} {...(image as ImageProps)}/>
    </div>)
  }</div>);
};

export default ImageView;