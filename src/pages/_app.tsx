import { AppProps } from "next/app";
import "style/style.css";
import { ErrorProvider } from "components/error";
import { UserSessionContextProvider } from "components/userSessionProvider";

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  (window as any).LOG_LEVEL = "DEBUG";
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorProvider>
      <UserSessionContextProvider>
        <Component {...pageProps} />
      </UserSessionContextProvider>
    </ErrorProvider>
  );
}
export default MyApp;
