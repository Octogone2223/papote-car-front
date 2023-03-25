export interface WhoIAmOutput {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  isVerified: boolean;
}

export interface LoginOutput {
  accessToken: string;
  refreshToken: string;
}

export interface SendRegisterEmailOutput {
  success: true;
  message: 'Verification email sent successfully';
}

export interface RegisterOutput {
  accessToken: string;
  refreshToken: string;
}

export interface UpdatePasswordOutput {
  success: true;
  message: 'Password reset email sent successfully';
}

export interface ResetPasswordOutput {
  success: true;
  message: 'Password reset successfully';
}

export interface UpdateOutput extends WhoIAmOutput {}
