export interface Values {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface RegisterType {
  username: string;
  email: string;
  password: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface LoginResponseType {
  message: unknown;
  statusCode: unknown;
  data: {
    accessToken: string;
  };
  status: number;
  statusText: string;
  headers: {
    "content-length": string;
    "content-type": string;
  };
  config: {
    transitional: {
      silentJSONParsing: boolean;
      forcedJSONParsing: boolean;
      clarifyTimeoutError: boolean;
    };
    adapter: string[];
    transformRequest: (null | undefined)[];
    transformResponse: (null | undefined)[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: Record<string, unknown>;
    headers: {
      Accept: string;
      "Content-Type": string;
      "__Host-psifi.x-csrf-token": string;
    };
    baseURL: string;
    method: string;
    url: string;
    data: string;
  };
  request: Record<string, unknown>;
}
