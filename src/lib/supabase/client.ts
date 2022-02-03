import { createClient } from "@supabase/supabase-js";
import throwError from "lib/throwError";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  throwError(
    new Error(`Missing environment variable 'NEXT_PUBLIC_SUPABASE_URL'.`)
  );

const supabaseSecretKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  throwError(
    new Error(`Missing environment variable 'NEXT_PUBLIC_SUPABASE_ANON_KEY'.`)
  );

const supabaseClient = createClient(supabaseUrl, supabaseSecretKey);

export default supabaseClient;
