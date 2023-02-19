import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const api_path = 'http://localhost:5000/api/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(private http: HttpClient) { }


  addTopic(topicForm: any, subId:string, ageId:string): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.post(`${api_path}/create/${id}/${subId}/${ageId}`, topicForm)
  }

  getTopicByAgeId(subject: string, ageId:string): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.get(`${api_path}/get/${id}/${subject}/${ageId}`)
  }

  getTopicBySubject(subject: string): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.get(`${api_path}/get/${id}/${subject}`)
  }

  getTopicById(topic: string): Observable<any> {
    let id = localStorage.getItem('id');
    return this.http.get(`${api_path}/getTopic/${id}/${topic}`)
  }

  deleteTopic(id: string): Observable<any> {
    return this.http.delete(`${api_path}/delete/${id}`)
  }
  // searchTopic(data: any): Observable<any> {
  //   return this.http.get(`${api_path}/search?topic=${data}`)
  // }
}
