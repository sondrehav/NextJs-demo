import {Image} from "types/catalogue";
import {Image as ImageComponent} from 'components/image';
import {Fragment} from "react";


const ImageView = ({ images }: { images: Image[] }) => {

  console.log(images)
  return (<div className={"my-8 "}>
    {images.map(image => <div key={image.url} className={"my-4 lg:mx-auto lg:my-8"}>
      <ImageComponent className={"overflow-hidden max-h-96 rounded-xl shadow-lg lg:mx-auto object-cover"} sizes={"(min-width: 1920px) 90vw, 700px"} {...image}/>
      {image.caption?.plainText && <p className={"my-4 text-gray-500 text-center"}><i>{image.caption.plainText}</i></p>}
    </div>)}
  </div>);
};

export default ImageView;