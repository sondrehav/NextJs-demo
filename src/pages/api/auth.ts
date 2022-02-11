import { NextApiRequest, NextApiResponse } from "next";
import anonClient from "lib/supabase/anonClient";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  anonClient().auth.api.setAuthCookie(req, res);
};

export default handler;
