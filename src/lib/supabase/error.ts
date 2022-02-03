import { PostgrestError } from "@supabase/supabase-js";

const getPostgresError = (error: PostgrestError) => {
  return new Error(`Supabase Postgres error: [ ${JSON.stringify(error)} ]`);
};

export default getPostgresError;
