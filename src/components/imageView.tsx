import {Image} from "types/catalogue";
import {Image as ImageComponent} from 'components/image';


const ImageView = ({ images }: { images: Image[] }) => {

  return (<div className={"my-8 "}>
    {images.map(image => <div className={"overflow-hidden relative max-h-96 rounded-xl shadow-lg my-8 lg:my-16 xl:max-w-6xl lg:mx-auto"} key={image.url}>
      <ImageComponent className={"object-cover w-full max-h-inherit xl:max-w-6xl"} sizes={"(max-width: 1920px) 90vw, 700px"} {...image}/>
    </div>)}
  </div>);
};

export default ImageView;