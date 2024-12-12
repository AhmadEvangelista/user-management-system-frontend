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

export interface ProfileInfoType {
  id: string;
}

// Interface for the JWT Header
interface JWTHeader {
  alg: string; // Algorithm used, e.g., 'HS256'
  typ: string; // Type, e.g., 'JWT'
}

// Interface for the JWT Payload
interface JWTPayload {
  username: string; // Username or identifier
  id: number; // User ID or similar unique identifier
  iat: number; // Issued at (timestamp)
  exp: number; // Expiration time (timestamp)
  [key: string]: unknown; // Optional additional properties
}

// Interface for Decoded JWT Token
export interface DecodedJWT {
  header: JWTHeader;
  payload: JWTPayload;
}
