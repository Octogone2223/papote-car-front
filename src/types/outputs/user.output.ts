export interface LoginOutput {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  isVerified: boolean;
}

export interface SendRegisterEmailOutput {
  success: true;
  message: 'Verification email sent successfully';
}
