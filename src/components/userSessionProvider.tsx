import {
  createContext,
  useContext,
  PropsWithChildren,
  ComponentType,
  useState,
  useEffect,
} from "react";
import { GoTrueClient } from "@supabase/gotrue-js";
import { DEFAULT_HEADERS } from "@supabase/supabase-js/src/lib/constants";
import { useThrow } from "components/error";
import { createClient } from "@supabase/supabase-js";
import supabaseClient from "lib/supabase/client";

export type UserSessionContextProps = GoTrueClient | null;

const UserSessionContext = createContext<UserSessionContextProps | null>(null);

export const useUserSessionContext = () => {
  return useContext(UserSessionContext);
};

export const UserSessionContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const throwError = useThrow();

  useEffect(() => {
    const { data: subscription, error } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        console.log(event);
      }
    );
    if (error) {
      throwError(
        new Error(
          `API error: [ status: ${error.status}; message: ${error.message} ]`
        )
      );
      return;
    }
    if (!subscription) return;
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserSessionContext.Provider value={supabaseClient.auth.session()}>
      {children}
    </UserSessionContext.Provider>
  );
};

export const withUserSessionContext = <T extends object>(
  WrappedComponent: ComponentType<T & { client: UserSessionContextProps }>
) => {
  const component = (props: T) => {
    const context = useUserSessionContext();
    return <WrappedComponent {...(props as T)} client={context} />;
  };
  component.displayName = WrappedComponent.displayName;
  return component as ComponentType<T>;
};
