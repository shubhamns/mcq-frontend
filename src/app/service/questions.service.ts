import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const api_path_mcqs = 'http://localhost:5000/api/mcqs';
const api_path_trueFalse = 'http://localhost:5000/api/true_false';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }
  addMcqs(mcqsForm: any, topicId: string): Observable<any> {
    let id = localStorage.getItem('id')
    // return this.http.post(`${api_path}/create/${id}/${topicId}/${typeId}`, mcqsForm)
    return this.http.post(`${api_path_mcqs}/create/${id}/${topicId}`, mcqsForm)
  }

  getMcqs() {
    return this.http.get(`${api_path_mcqs}/`)
  }

  // getImageMcqs(imageName: string) {
  //   return this.http.get(`${api_path}/image?image=${imageName}`, { responseType: 'blob'})
  // }

  getImageMcqs(imageName: string) {
    return this.http.get(`${api_path_mcqs}/files/${imageName}`, { responseType: 'blob'})
  }
  
  getMcqsByTopic(topic: any) {
    let id = localStorage.getItem('id')
    // return this.http.get(`${api_path}/getMcqs/${id}/${topic}/${type}`)
    return this.http.get(`${api_path_mcqs}/getMcqs/${id}/${topic}`)
  }

  deleteMcqs(id: any) {
    return this.http.delete(`${api_path_mcqs}/delete/${id}`)
  }

  addTrueFalse(trueFlaseForm: any, topicId: string): Observable<any> {
    let id = localStorage.getItem('id')
    return this.http.post(`${api_path_trueFalse}/create/${id}/${topicId}`, trueFlaseForm)
  }

  getTrueFalseByTopic(topic: any) {
    let id = localStorage.getItem('id')
    return this.http.get(`${api_path_trueFalse}/get/${id}/${topic}`)
  }

  deleteTrueFalse(id: any) {
    return this.http.delete(`${api_path_trueFalse}/delete/${id}`)
  }
}
