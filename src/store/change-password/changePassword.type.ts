export interface ChangePasswordType {
  oldPassword: string;
  newPassword: string;
}

export interface SuccessResponseType {
  username: string;
  id: number;
  email: string;
  password: string;
}

export interface ErrorResponseType {
  message: string;
  error: string;
  statusCode: number;
}
