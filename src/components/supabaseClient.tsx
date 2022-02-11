import {
  createContext,
  useContext,
  PropsWithChildren,
  ComponentType,
  useEffect,
  useState,
} from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import anonClient from "lib/supabase/anonClient";

export type SupabaseClientProps = { client: SupabaseClient | null };

const SupabaseClientContext = createContext<SupabaseClientProps | null>(null);

export const useSupabaseClientContext = () => {
  const context = useContext(SupabaseClientContext);
  if (!context) throw new Error("SupabaseClientContext not set!");
  return context;
};

export const SupabaseClientProvider = ({ children }: PropsWithChildren<{}>) => {
  const [client, setClient] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    if (!client) {
      setClient(anonClient());
    }
  }, []);

  return (
    <SupabaseClientContext.Provider value={{ client }}>
      {children}
    </SupabaseClientContext.Provider>
  );
};

export const withSupabaseClientContext = <T extends object>(
  WrappedComponent: ComponentType<T & SupabaseClientProps>
) => {
  const component = (props: T) => {
    const context = useSupabaseClientContext();
    return <WrappedComponent {...(props as T)} {...context} />;
  };
  component.displayName = WrappedComponent.displayName;
  return component as ComponentType<T>;
};
