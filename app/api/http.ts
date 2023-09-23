const $http = () => {
  type DefaultHeader = {
    Accept: string;
    "Content-Type": string;
  };

  type Options = {
    method: string;
    headers: DefaultHeader;
    body?: string;
  };

  type QueryParams = {
    [key: string]: string;
  };

  type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

  const defaultHeader: DefaultHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const customFetch = (
    url: string,
    method: HttpMethod = "GET",
    body: any = false,
    headers: DefaultHeader = defaultHeader
  ) => {
    const options: Options = {
      method,
      headers,
    };

    if (body) options.body = JSON.stringify(body);

    return fetch(url, options)
      .then((response) => response.json())
      .catch((err) => {
        throw new Error(err);
      });
  };

  const get = (id: string, query?: QueryParams) => {
    let queryString = "";
    if (query) {
      queryString = Object.keys(query)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join("&");
    }

    const url = `${id ? `/${id}` : ""}`;
    return customFetch(url);
  };

  const post = (body: any = false) => {
    if (!body) throw new Error("to make a post you must provide a body");
    return customFetch("POST", body);
  };

  const put = (id: string = "", body: any = false) => {
    if (!id || !body)
      throw new Error("to make a put you must provide the id and the body");
    const url = `/${id}`;
    return customFetch(url, "PUT", body);
  };

  const del = (id: string = "") => {
    if (!id)
      throw new Error("to make a delete you must provide the id and the body");
    const url = `/${id}`;
    return customFetch(url, "DELETE");
  };

  return {
    get,
    post,
    put,
    del,
  };
};

export default $http;
