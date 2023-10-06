import CookiesService from "@/app/services/cookies";

interface ExtendedRequestInit extends RequestInit {
  params?: object;
}

class HttpService {
  private readonly baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    url: RequestInfo | URL,
    options?: ExtendedRequestInit | undefined
  ): Promise<T | undefined> {
    let searchParams: URLSearchParams = new URLSearchParams({});
    const ACCESS_TOKEN_COOKIE_NAME = "vue_app_access_token";
    const { get } = CookiesService();
    const token = await get(ACCESS_TOKEN_COOKIE_NAME);
    if (token) {
      searchParams.append("access-token", token);
    }
    if (options?.params) {
      for (const key in options.params as { [key: string]: string }) {
        searchParams.append(
          key,
          (options.params as { [key: string]: any })[key]
        );
      }
    }
    try {
      const response = await fetch(
        searchParams.size
          ? `${this.baseUrl}/${url}?${searchParams.toString()}`
          : `${this.baseUrl}/${url}`,
        options
      );

      if (response.status >= 400) {
        console.error(response);
      }

      if (response.status === 404) {
        throw new Error("Page not found");
      } else if (response.status === 500) {
        throw new Error("Server error");
      } else if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      console.error(error);
    }
  }

  async get<T>(url: string, options: ExtendedRequestInit = {}) {
    return await this.request<T>(url, { method: "GET", ...options });
  }

  async post<T>(
    url: string,
    payload: unknown,
    options: ExtendedRequestInit = {}
  ) {
    return await this.request<T>(url, {
      method: "POST",
      body: JSON.stringify(payload),
      ...options,
    });
  }

  async put<T>(
    url: string,
    payload: unknown,
    options: ExtendedRequestInit = {}
  ) {
    return await this.request<T>(url, {
      method: "PUT",
      body: JSON.stringify(payload),
      ...options,
    });
  }

  async patch<T>(
    url: string,
    payload: unknown,
    options: ExtendedRequestInit = {}
  ) {
    return await this.request<T>(url, {
      method: "PATCH",
      body: JSON.stringify(payload),
      ...options,
    });
  }

  async delete<T>(url: string, options: ExtendedRequestInit = {}) {
    return await this.request<T>(url, {
      method: "DELETE",
      ...options,
    });
  }
}

const $http = new HttpService(process.env.NEXT_PUBLIC_API_BASE_URL || "");

export default $http;

/* const $http = () => {
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
 */
