import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForgotPasswordDto, TokenDto, UserForAuthDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginPath = 'https://localhost:5001/api/authentication/login';
  private forgotPasswordPath =
    'https://localhost:5001/api/accounts/forgotPassword';
  constructor(private http: HttpClient) {}

  login = (userForAuth: UserForAuthDto) => {
    return this.http.post<TokenDto>(this.loginPath, userForAuth, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    });
  };

  forgotPasswordRequest = (forgotPasswordDto: ForgotPasswordDto) => {
    return this.http.post<any>(this.forgotPasswordPath, forgotPasswordDto);
  };
}
