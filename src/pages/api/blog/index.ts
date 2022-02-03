import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { BlogListingType, getBlogListings } from "lib/supabase/blogListing";

const blogListing = async (
  req: NextApiRequest,
  res: NextApiResponse<BlogListingType[]>
) => {
  if (req.method !== "GET") return res.status(405);
  try {
    const results = await getBlogListings({});
    if (results === null) return res.status(404);
    return res.status(200).json(results);
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};

export default blogListing;
