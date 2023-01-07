export interface TokenDto {
  AccessToken: string;
  RefreshToken: string;
}

export interface UserForAuthDto{
  Email: string;
  Password: string;
}


export interface ForgotPasswordDto{
  Email: string;
  ResetPasswordClientURI: string;
}
