import {
  createContext,
  useContext,
  PropsWithChildren,
  ComponentType,
  useState,
  useEffect,
} from "react";
import { Image as ImageProps } from "types/image";

type CDNOrLocal = Record<string, ImageProps>;

export type ImageContextProps = {
  cdn?: CDNOrLocal;
};

const ImageContext = createContext<ImageContextProps | null>(null);

export const useImageContext = () => {
  return useContext(ImageContext);
};

export const ImageProvider = ({
  children,
  ...props
}: PropsWithChildren<ImageContextProps>) => {
  return (
    <ImageContext.Provider value={props}>{children}</ImageContext.Provider>
  );
};

export const withImageContext = <T extends object>(
  WrappedComponent: ComponentType<T & ImageContextProps>
) => {
  const component = (props: T) => {
    const context = useImageContext();
    if (context) {
      return <WrappedComponent {...(props as T)} cdn={context.cdn} />;
    }
    return <WrappedComponent {...(props as T)} />;
  };
  component.displayName = WrappedComponent.displayName;
  return component as ComponentType<T>;
};

export type ImageContextEditorProps = {
  setPreviews: (fn: (old: CDNOrLocal) => CDNOrLocal) => any;
};

const ImageContextEditorContext = createContext<ImageContextEditorProps | null>(
  null
);

export const useImageContextEditorContext = () => {
  const context = useContext(ImageContextEditorContext);
  if (!context) throw new Error("ImageContextEditorContext not set!");
  return context;
};

export const ImageContextEditorProvider = ({
  children,
  initial,
}: PropsWithChildren<{ initial?: CDNOrLocal }>) => {
  const [images, setImages] = useState<CDNOrLocal>({ ...initial });

  const setPreviews = (fn: (old: CDNOrLocal) => CDNOrLocal) => {
    const newImages = fn({ ...images });
    setImages(newImages);
  };
  useEffect(() => {}, [images]);
  return (
    <ImageContextEditorContext.Provider value={{ setPreviews }}>
      <ImageProvider cdn={images}>{children}</ImageProvider>
    </ImageContextEditorContext.Provider>
  );
};

export const withImageContextEditorContext = <T extends object>(
  WrappedComponent: ComponentType<T & ImageContextEditorProps>
) => {
  const component = (props: T) => {
    const context = useImageContextEditorContext();
    return <WrappedComponent {...(props as T)} {...context} />;
  };
  component.displayName = WrappedComponent.displayName;
  return component as ComponentType<T>;
};
