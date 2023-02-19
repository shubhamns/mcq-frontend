import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const api_path_age = 'http://localhost:5000/api/age';
const api_path_language = 'http://localhost:5000/api/language';
const api_path_country = 'http://localhost:5000/api/country';
const api_path_grade = 'http://localhost:5000/api/grade';
const api_path_type = 'http://localhost:5000/api/type';
const api_path_subject = 'http://localhost:5000/api/subject';

@Injectable({
  providedIn: 'root'
})
export class ActivityFormService {

  constructor(private http: HttpClient) { }
  getGeGroup() {
    return this.http.get(`${api_path_age}/get`)
  }

  getAllLanguage() {
    return this.http.get(`${api_path_language}/get`)
  }

  getCountry(): Observable<any> {
    return this.http.get(`${api_path_country}/get`)
  }

  getGrade(): Observable<any> {
    return this.http.get(`${api_path_grade}/get`)
  }

  getQuestionType(): Observable<any> {
    return this.http.get(`${api_path_type}/get`)
  }

  getSubject(): Observable<any> {
    return this.http.get(`${api_path_subject}/get`)
  }
}
