import {
  ComponentType,
  createContext,
  forwardRef,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { Button } from "components/editor/inputs";
import Google from "icons/google.svg";
import { Session } from "@supabase/gotrue-js";
import { withRouter } from "next/router";
import anonClient from "lib/supabase/anonClient";
import {
  SupabaseClientProps,
  withSupabaseClientContext,
} from "components/supabaseClient";

const redirectTo =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
    ? "http://localhost:3962/auth"
    : undefined;

const Modal = dynamic(import("components/modal"), { ssr: false });

export type WithAuthenticationContextProps = { userSession: Session | null };

const AuthenticationContext =
  createContext<WithAuthenticationContextProps | null>(null);

export const useAuthenticationContext = () => useContext(AuthenticationContext);

const signIn = () =>
  anonClient().auth.signIn({ provider: "google" }, { redirectTo });

export const AuthenticationModal = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className={"flex flex-row justify-center items-center h-full"}>
      <div
        className={"bg-gray-800 p-8 shadow flex flex-col rounded-lg"}
        ref={ref}
      >
        <h3 className={"text-2xl my-4"}>Sign in</h3>
        <Button
          onClick={() => signIn()}
          className={"flex flex-row space-x-4 items-center"}
        >
          <Google width={16} height={16} className={"fill-current"} />
          <span>Sign in with Google</span>
        </Button>
      </div>
    </div>
  );
});
AuthenticationModal.displayName = "AuthenticationModal";

export const withAuthenticationContext = <T extends object>(
  WrappedComponent: ComponentType<T & WithAuthenticationContextProps>
) => {
  const component = (props: T) => {
    const context = useAuthenticationContext();
    return (
      <WrappedComponent
        {...(props as T)}
        userSession={context?.userSession ?? null}
      />
    );
  };
  component.displayName = WrappedComponent.displayName;
  return component as ComponentType<T>;
};

export const AuthenticationProvider = withSupabaseClientContext(
  ({ children, client }: PropsWithChildren<SupabaseClientProps>) => {
    const [userSession, setUserSession] = useState(
      client?.auth.session() ?? null
    );

    console.log(userSession);

    useEffect(() => {
      if (!client) return;
      setUserSession(client.auth.session());
      const { data: authStateListener } = client.auth.onAuthStateChange(
        (event, session) => {
          fetch("/api/auth", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body: JSON.stringify({ event, session }),
          }).catch((e) => console.error(e));
          setUserSession(session);
        }
      );
      return () => {
        authStateListener?.unsubscribe();
      };
    }, [client]);

    return (
      <AuthenticationContext.Provider value={{ userSession }}>
        {children}
      </AuthenticationContext.Provider>
    );
  }
);

const AuthenticationModalContainer = withRouter(({ router }) => {
  return (
    <Modal visible={true} onBgClick={() => router.push("/")}>
      <AuthenticationModal />
    </Modal>
  );
});

export const RequireAuthentication = withAuthenticationContext(
  ({
    children,
    userSession,
    showModal = false,
  }: PropsWithChildren<{ showModal?: boolean }> &
    WithAuthenticationContextProps) => {
    if (showModal) return <AuthenticationModalContainer />;
    if (!userSession) return null;
    return <>{children}</>;
  }
);

export type UserInfoProps = {
  name: string;
  email: string;
  picture: string;
};

export type WithUserInfoProps = { userInfo: UserInfoProps | null };

const isUserInfoProps = (value: any): value is UserInfoProps =>
  typeof value.email === "string" &&
  typeof value.name === "string" &&
  typeof value.picture === "string";

export const withUserInfo = <T extends object>(
  WrappedComponent: ComponentType<T & WithUserInfoProps>
) => {
  const component: ComponentType<T> = withAuthenticationContext(
    ({ userSession, ...props }: T & WithAuthenticationContextProps) => {
      const user = userSession?.user;
      // eslint-disable-next-line camelcase
      const identity = user?.identities
        ?.map(({ identity_data: { email, name, picture } }) => ({
          email,
          name,
          picture,
        }))
        .find((data) => isUserInfoProps(data)) as undefined | UserInfoProps;

      if (!identity) {
        return <WrappedComponent {...(props as T)} userInfo={null} />;
      }

      return <WrappedComponent {...(props as T)} userInfo={identity} />;
    }
  );
  component.displayName = WrappedComponent.displayName;
  return component as ComponentType<T>;
};
