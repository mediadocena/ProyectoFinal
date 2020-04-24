import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from '../Const/const';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  token;
  httpOptions
  constructor(private httpClient:HttpClient) {
    if(localStorage.getItem('token')!=null){
      this.token = JSON.parse(localStorage.getItem('token'));
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.token.access_token}`
        })
      };
      }
   }
  postData(formData){
    return this.httpClient.post<any>(`${api}portfolio`, formData,this.httpOptions);
  }
  GetAll(){
    return this.httpClient.get(`${api}portfolio`);
  }
  GetById(id){
    return this.httpClient.get(`${api}userportfolio/${id}`,this.httpOptions);
  }
  GetPost(id){
    return this.httpClient.get(`${api}getportfolio/${id}`,this.httpOptions);
  }
  Update(data){
    return this.httpClient.put(`${api}portfolio`,data,this.httpOptions);
  }
  
}
