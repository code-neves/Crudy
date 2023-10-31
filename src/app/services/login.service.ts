import { Injectable } from '@angular/core';
import { Login } from '../model/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private fixedCredentials:Login = {
    user: "admin",
    password: "admin"
  }

  constructor() {}

  verifyCredentials(user: string, password: string):boolean{
    return user === this.fixedCredentials.user && password === this.fixedCredentials.password
  }

}