import {apiFetch} from "lib/fetch/helpers";
import pageQuery from './query.gql';
import searchQuery from './search.gql';
import {Query} from "types/catalogue";
import {Query as SearchQuery} from "types/search";

const fetchPage = async (path: string) => {
  const result = await apiFetch<Query>(
    `${process.env.API_URL!}/catalogue`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: pageQuery, variables: { path } }) });
  return result;
};

export default fetchPage;

export const fetchPageList = async () => {
  const result = await apiFetch<SearchQuery>(
    `${process.env.API_URL!}/search`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: searchQuery }) });
  return result;
};