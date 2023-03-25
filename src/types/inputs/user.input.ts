export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
}

export interface UpdatePasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  newPassword: string;
  token: string;
}

export interface UpdateInput extends Omit<RegisterInput, 'password'> {}
