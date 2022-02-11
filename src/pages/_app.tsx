import { AppProps } from "next/app";
import "style/style.css";
import { ErrorProvider } from "components/error";
import { AuthenticationProvider } from "components/authentication";
import { SupabaseClientProvider } from "components/supabaseClient";

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  (window as any).LOG_LEVEL = "DEBUG";
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorProvider>
      <SupabaseClientProvider>
        <AuthenticationProvider>
          <Component {...pageProps} />
        </AuthenticationProvider>
      </SupabaseClientProvider>
    </ErrorProvider>
  );
}
export default MyApp;
