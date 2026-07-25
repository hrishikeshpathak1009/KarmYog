export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface JwtPayload {
  userId: string;
}