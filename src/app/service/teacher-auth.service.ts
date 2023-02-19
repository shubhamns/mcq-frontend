import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

const api_path = 'http://localhost:5000/api/users';
const api_file = 'http://localhost:5000/api/image';

@Injectable({
  providedIn: 'root'
})

export class TeacherAuthService {

  constructor(private http: HttpClient, private _sanitize: DomSanitizer) { }

  registerUser(registerForm: any): Observable<any> {
    return this.http.post(`${api_path}/create`, registerForm);
  }

  loginUser(loginForm: any, isVerified: any): Observable<any> {
    return this.http.post(`${api_path}/login`, loginForm, isVerified);
  }

  getUser(): Observable<any> {
    return this.http.get(`${api_path}/`);
  }

  getUserById(): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.get(`${api_path}/${id}`)
  }

  updateUser(body: any): Observable<any> {
    // console.log(body)
    const bodyz = {
      name: body.name,
      // lastname: body.lastname,
      // username: body.username,
      // phone: body.phone,
      // country: body.country
    }
    let id = localStorage.getItem('id');
    const path = `${api_path}/update/${id}`;
    // console.log(bodyz)
    return this.http.put(path, bodyz)
  }

  deleteUser(): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.delete(`${api_path}/delete/${id}`);//), { headers: headers })
  }

  verifyEmail(token: any) {
    return this.http.get(`${api_path}/confirm/${token}`, { responseType: 'text' });
  }

  changePassword(changeForm: any) {
    let id = localStorage.getItem('id');
    return this.http.post(`${api_path}/changePassword/${id}`, changeForm)
  }

  forgotPassword(forgotForm: any): Observable<any> {
    return this.http.post(`${api_path}/forgot-password`, forgotForm);
  }

  resetPassword(userId: any, token: any, resetForm: any): Observable<Object> {
    return this.http.post(`${api_path}/forgot/${userId}/${token}`, resetForm, { responseType: 'text' })
  }

  requestResetPassword(userId: any, token: any): Observable<Object> {
    return this.http.get(`${api_path}/forgot/${userId}/${token}`, { responseType: 'text' })
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    let id = localStorage.getItem('id')
    formData.append('file', file);
    const req = new HttpRequest('POST', `${api_file}/upload/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFilesByName(): Observable<any> {
    let name = localStorage.getItem('id')
    return this.http.get(`${api_file}/files/${name}`, { responseType: 'blob' }); // responce type blob
  }

  getAllFiles(): Observable<any> {
    return this.http.get(`${api_file}/files`);
  }

  signInWithGoogle(id_token: string): Observable<any> {
    return this.http.post(`${api_path}/google`, id_token)
  }

}
