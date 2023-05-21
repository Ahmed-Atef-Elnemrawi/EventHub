import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenDto } from '../models';
import { environment } from 'src/environments/environment';

const ROOT_PATH = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  rootPath = `${ROOT_PATH}/token`;
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
