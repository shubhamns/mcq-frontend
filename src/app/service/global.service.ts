import { Injectable } from '@angular/core';
// import { decode } from 'angular2-jwt';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
  getItem(key: string) {
    return localStorage.getItem(key);
  }
  public getToken() {
    return localStorage.getItem('token');
  }
  // public isAuthenticated(): boolean {
  //   // get the token
  //   const token = this.getToken();
  //   // return a boolean reflecting 
  //   // whether or not the token is expired
  //   return tokenNotExpired(null, token);
  // }
}
