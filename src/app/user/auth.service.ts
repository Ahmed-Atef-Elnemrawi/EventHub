import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TokenDto, userForAuthDto } from '.';
import { EnvironmentUrlService } from '../shared/environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginPath = "https://localhost:5001/api/authentication/login"
  constructor (private http:HttpClient)
  {

  }

  login = (userForAuth: userForAuthDto)=>{
    return this.http.post<TokenDto>(this.loginPath, userForAuth, {
      headers: new HttpHeaders(
        {"Content-Type": "application/json",
         "Accept": "application/json"}
      )
    })
  }

}
