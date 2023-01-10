export interface TokenDto {
  accessToken: string;
  refreshToken: string;
}

export interface UserForAuthDto {
  email: string;
  password: string;
}

export interface ForgotPasswordDto {
  email: string;
  resetPasswordClientURI: string;
}

export interface ResetPasswordDto {
  password: string;
  confirm: string;
  email: string;
  token: string;
}


export const AuthValidationMessages = {
  email: {
    required: 'Email is required',
  },

  password: {
    required: 'Password is required',
  },
};


export const resetPasswordValidationMessages:{[key:string]: {[key:string]: string}} = {
  "password":{
    required:"Password is required"
  },
  "confirm":{
    match: "Password and confirmation does not match"
  }
}
