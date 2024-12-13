export interface SuccessResponseType {
  username: string;
  id: number;
  email: string;
  password: string;
}

export interface ErrorResponseType {
  message: string;
  statusCode: string;
}
