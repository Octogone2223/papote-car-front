export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
}
