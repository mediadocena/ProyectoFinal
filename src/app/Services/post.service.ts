import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    return this.httpClient.post<any>('http://127.0.0.1:5000/portfolio', formData,this.httpOptions);
  }
  GetAll(){
    return this.httpClient.get('http://127.0.0.1:5000/portfolio');
  }
  GetById(id){
    return this.httpClient.get(`http://127.0.0.1:5000/userportfolio/${id}`,this.httpOptions);
  }
  GetPost(id){
    return this.httpClient.get(`http://127.0.0.1:5000/getportfolio/${id}`,this.httpOptions);
  }
  Update(data){
    return this.httpClient.put('http://127.0.0.1:5000/portfolio',data,this.httpOptions);
  }
  
}
