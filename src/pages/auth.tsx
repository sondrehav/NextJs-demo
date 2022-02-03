import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { useEffect, useState } from "react";
import Layout from "components/layout";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import supabaseClient from "lib/supabase/client";

const parseQS = (hash: string) =>
  hash
    .replace(/^#/, "")
    .split("&")
    .map((value) => value.split("="))
    .reduce<Record<string, string>>(
      (a, [key, value]) => ({ ...a, [key]: value }),
      {}
    );

const TokenFromQS = () => {
  const { replace } = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const qs = parseQS(window.location.hash);
    if (!qs.access_token || !qs.refresh_token) {
      setAuthError("Could not authenticate.");
      return;
    }
    replace("/");
  }, []);

  if (authError)
    return (
      <span className={"font-bold text-red-800 uppercase"}>{authError}</span>
    );
  return (
    <span className={"font-bold uppercase"}>Waiting for authentication...</span>
  );
};
export default function AuthPage() {
  return (
    <Layout>
      <div className={"flex flex-column justify-center items-center my-8"}>
        <h1>Hola!</h1>
        <TokenFromQS />
      </div>
    </Layout>
  );
}
