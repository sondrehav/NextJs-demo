export const apiFetch = async <T>(url: string, init: RequestInit = {}) => {
  const res = await fetch(url, init)
    .then(res => {
      if(res.status >= 300) {
        throw new Error("Status error: " + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .then(res => {
      if(res.error) {
        throw new Error("GraphQL error: " + JSON.stringify(res.error));
      }
      if(res.errors) {
        throw new Error("GraphQL error: " + JSON.stringify(res.errors));
      }
      return res.data;
    });
  return res as T;
};