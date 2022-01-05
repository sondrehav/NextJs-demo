import {
  createContext,
  useContext,
  PropsWithChildren,
  ComponentType,
} from "react";
import { Image as ImageProps } from "types/image";

export type ImageContextProps = {
  cdn?: Record<string, ImageProps>;
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
