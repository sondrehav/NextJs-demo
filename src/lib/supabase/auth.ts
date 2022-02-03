import getClient from "lib/supabase/client";

const redirectTo =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
    ? "http://localhost:3962/auth"
    : undefined;

export const signIn = async () => {
  const supabase = await getClient();
  const { user, session, error } = await supabase.auth.signIn(
    {
      provider: "google",
    },
    {
      redirectTo,
    }
  );
  if (error) {
    throw error;
  }
  return {
    user,
    session,
  };
};
