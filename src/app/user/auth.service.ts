import {
  HttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthResponse,
  ForgotPasswordDto,
  ResetPasswordDto,
  UserForAuthDto,
  UserForRegistrationDto,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private rootPath = 'https://localhost:5001/api/users';

  constructor(private http: HttpClient) {}

  login = (userForAuth: UserForAuthDto) => {
    return this.http.post<AuthResponse>(`${this.rootPath}/login`, userForAuth);
  };

  forgotPasswordRequest = (forgotPasswordDto: ForgotPasswordDto) => {
    return this.http.post<void>(
      `${this.rootPath}/forgotPassword`,
      forgotPasswordDto
    );
  };

  resetPassword = (resetPassword: ResetPasswordDto) => {
    return this.http.post<void>(
      `${this.rootPath}/resetPassword`,
      resetPassword
    );
  };

  registerUser = (userForRegistration: UserForRegistrationDto) => {
    return this.http.post<void>(`${this.rootPath}/signup`, userForRegistration);
  };
}
