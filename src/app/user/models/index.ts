export interface UserProfile {
  id: string,
  firstName: string;
  lastName: string;
  userName: string;
  age: 0;
  email: string;
  phoneNumber: string;
  genre: string;
  country: string;
  profilePicture?: string;
}

export interface TokenDto {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  tokenDto: TokenDto,
  userProfile: UserProfile
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
  roles?: string[] | [];
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
    minlength: 'Password should be greater than 10 characters. ',
    pattern: `Password should have at least one uppercase(A-Z).
              password should have at least one number (0-9).
              password should have at least one special character(!@#$%^&*=+-).`,
  },
  confirm: {
    match: 'Password and confirmation does not match'
  },
};

export const signupValidationMessages:
  | { [key: string]: { [key: string]: string } }
  | any = {
  firstName: {
    required: 'FirstName is required. ',
    minlength: 'FirstName should be at least 3 characters. ',
    pattern: 'FirstName should not have a special characters. ',
  },
  lastName: {
    required: 'LastName is required. ',
    minlength: 'LastName should be at least 3 characters. ',
    pattern: 'LastName should not have a special characters. ',
  },
  userName: {
    required: 'UserName is required. ',
    minlength: 'userName should be at least 4 characters. ',
    pattern: 'UserName should not have a special characters except "_". ',
  },
  email: {
    required: 'Email is required.',
    pattern: 'Please enter a valid email.',
  },
  password: {
    required: 'Password is required',
    minlength: 'Password should be greater than 10 characters. ',
    pattern: `Password should have at least one uppercase(A-Z).
              password should have at least one number (0-9).
              password should have at least one special character(!@#$%^&*=+-).`,
  },
  phoneNumber: {
    required: 'Phone number is requried. ',
    pattern: 'Please enter a valid number. ',
  },
  liveIn: {
    required: 'Please enter your country.',
  },
  age: {
    required: 'Age is requried.',
    min: 'Age should be greater than 10 years. ',
    max: 'Age should be less than 80 years. ',
    pattern: 'Age should be a number',
  },
  genre: {
    required: 'Genre is required.',
  },
};
