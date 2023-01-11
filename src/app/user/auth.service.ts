import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  TokenDto,
  UserForAuthDto,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginPath = 'https://localhost:5001/api/authentication/login';
  private forgotPasswordPath ='https://localhost:5001/api/accounts/forgotPassword';
  private resetPasswordPath = 'https://localhost:5001/api/accounts/resetPassword';

  constructor(private http: HttpClient) {}

  login = (userForAuth: UserForAuthDto) => {
    return this.http.post<TokenDto>(this.loginPath, userForAuth, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'accept': 'application/json',
      }),
    });
  };

  forgotPasswordRequest = (forgotPasswordDto: ForgotPasswordDto) => {
    return this.http.post<void>(this.forgotPasswordPath, forgotPasswordDto);
  };

  resetPassword = (resetPassword: ResetPasswordDto) => {
    return this.http.post<void>(this.resetPasswordPath, resetPassword, {
      headers:new HttpHeaders({
        'content-type': 'application/json',
        'accept': 'application/json'
      })
    });
  };
}
