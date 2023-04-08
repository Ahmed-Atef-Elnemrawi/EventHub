import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  rootPath = 'https://localhost:5001/api/token'
  constructor(private http:HttpClient) { }

  refreshToken = (token:TokenDto)=>{
    return this.http.post<TokenDto>(this.rootPath, token,{
      headers:{
        'content-type': 'application/json',
        accept:'application/json'
      }
    })
  }
}
