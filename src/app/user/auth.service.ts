import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  TokenDto,
  UserForAuthDto,
  UserForRegistrationDto,
  UserProfile,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private rootPath = 'https://localhost:5001/api/users';

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) {}

  login = (userForAuth: UserForAuthDto) => {
    return this.http.post<TokenDto>(`${this.rootPath}/login`, userForAuth);
  };

  loadUser = (id: string) => {
    return this.http.get<UserProfile>(`${this.rootPath}/${id}`, {
      headers: {
        'content-type': 'application/json',
      },
    });
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

  updateUser = (userProfile: UserProfile, userId: string) => {
    return this.http.put(`${this.rootPath}/${userId}`, userProfile);
  };

  isAuthenticated = (): boolean => {
    let token = localStorage.getItem('token');
    if (token !== null) {
      let accessToken = (JSON.parse(token) as TokenDto).accessToken;
      if (!this.jwtHelper.isTokenExpired(accessToken)) {
        localStorage.setItem('isAuthenticated', 'true');
        return true;
      }
      localStorage.setItem('isAuthenticated', 'false');
      return false;
    }
    localStorage.setItem('isAuthenticated', 'false');
    return false;
  };

  getUserId = (): string => {
    let token = localStorage.getItem('token');
    console.log(this.jwtHelper.decodeToken(token!))
    if (token !== null) {
      let accessToken = (JSON.parse(token) as TokenDto).accessToken;
      return this.jwtHelper.decodeToken(accessToken)[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];
    }
    return '';
  };

  refreshToken = (token: TokenDto) => {
    if (!this.jwtHelper.isTokenExpired(token.accessToken)) return;

    return this.http.post('api/token/refresh', token);
  };
}
