import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import {
  AuthResponse,
  ForgotPasswordDto,
  ResetPasswordDto,
  TokenDto,
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
    return this.http
      .post<AuthResponse>(`${this.rootPath}/login`, userForAuth, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          accept: 'application/json',
        }),
      })

  };

  forgotPasswordRequest = (forgotPasswordDto: ForgotPasswordDto) => {
    return this.http.post<void>(`${this.rootPath}/forgotPassword`, forgotPasswordDto);
  };

  resetPassword = (resetPassword: ResetPasswordDto) => {
    return this.http.post<void>(`${this.rootPath}/resetPassword`, resetPassword, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        accept: 'application/json',
      }),
    });
  };

  registerUser = (userForRegistration: UserForRegistrationDto) => {
    return this.http.post<void>(`${this.rootPath}/signup`, userForRegistration);
  };



}
