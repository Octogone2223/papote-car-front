export type User = {
  id: number;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  description?: string;
};
