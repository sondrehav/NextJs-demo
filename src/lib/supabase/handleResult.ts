import { PostgrestResponse } from "@supabase/supabase-js";

const handleResult = async <T>({
  data,
  error,
}: PostgrestResponse<T>): Promise<T[] | null> => {
  if (error) throw error;
  return data;
};

export default handleResult;
