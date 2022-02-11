import { createClient } from "@supabase/supabase-js";
import throwError from "lib/throwError";
import { SupabaseClientOptions } from "@supabase/supabase-js/dist/main/lib/types";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  throwError(
    new Error(`Missing environment variable 'NEXT_PUBLIC_SUPABASE_URL'.`)
  );

const supabaseSecretKey =
  process.env.SUPABASE_SERVICE_KEY ??
  throwError(new Error(`Missing environment variable 'SUPABASE_SERVICE_KEY'.`));

export default (options: SupabaseClientOptions = {}) =>
  createClient(supabaseUrl, supabaseSecretKey, options);
