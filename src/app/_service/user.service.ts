import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_model/user';
import { HOST } from '../_shared/var.constants';

@Injectable({
    providedIn: 'root',
  })
  export class UserService {
    private url = `https://1xvsj3adyf.execute-api.sa-east-1.amazonaws.com`;
    constructor(private http: HttpClient) {}
  
    login(user : User) {
      return this.http.post<User>(`${this.url}/login}`, user);
    }
    register(user : User){
        return this.http.post<User>(`${this.url}/register}`, user)
    }
  }
  