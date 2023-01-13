export interface TokenDto {
  accessToken: string;
  refreshToken: string;
}

export interface UserForAuthDto {
  email: string;
  password: string;
}

export interface UserForRegistrationDto {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  liveIn: string;
  genre: genre;
  age: number;
  roles: string[];
}

export enum genre {
  none,
  male,
  female,
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

export const resetPasswordValidationMessages: {
  [key: string]: { [key: string]: string };
} = {
  password: {
    required: 'Password is required',
  },
  confirm: {
    match: 'Password and confirmation does not match',
  },
};

export const signupValidationMessages:
  | { [key: string]: { [key: string]: string } }
  | any = {
  firstName: {
    required: 'FirstName is required',
    minLength: 'FirstName should be at least 3 characters',
    pattern: 'FirstName should not have a special characters',
  },
  lastName: {
    required: 'LastName is required',
    minlength: 'LastName should be at least 3 characters',
    pattern: 'LastName should not have a special characters',
  },
  userName: {
    required: 'UserName is required',
    pattern:'UserName should not have a special characters'
  },
  email: {
    required: 'Email is required',
    pattern: 'Please enter a valid email',
  },
  password: {
    required: 'Password is required',
    minLength: 'Password should be greater than 10 characters',
    pattern: `Password should have at least one uppercase(A-Z).
              password should have at least one number (0-9).
              password should have at least one special character(!@#$%^&*=+-_).`,
  },
  phoneNumber: {
    required: 'Phone number is requried',
  },
  liveIn: {
    required: 'Please enter your country',
  },
  age: {
    required: 'Age is requried',
  },
  genre: {
    required: 'Genre is required',
  },
};
