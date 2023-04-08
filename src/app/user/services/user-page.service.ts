import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserPage } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserPageService {

rootPath ='https://localhost:5001/api/v1.0/userpages';

  constructor(private http:HttpClient) { }

  getUserPage = (id:string) =>{
    return this.http.get<UserPage>(`${this.rootPath}/${id}`, {
      headers:{
        accept:'application/json',
        'content-type': 'application/json'
      }
    })
  }
}
