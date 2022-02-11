import { useEffect } from "react";
import Layout from "components/layout";
import { useRouter } from "next/router";
import { useAuthenticationContext } from "components/authentication";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> => {
  return {
    props: {},
  };
};

const AuthenticationLoading = () => {
  const userSession = useAuthenticationContext();
  const { replace } = useRouter();

  useEffect(() => {
    if (userSession !== null) {
      replace("/");
      return;
    }
  }, [userSession]);

  return <h3>Currently authenticating, hold on for a bit...</h3>;
};

export default function AuthPage() {
  return (
    <Layout>
      <div className={"flex flex-col justify-center items-center my-8"}>
        <h1>Hola!</h1>
        <AuthenticationLoading />
      </div>
    </Layout>
  );
}
