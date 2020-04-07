import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient:HttpClient) { }
  token:any = JSON.parse(localStorage.getItem('token'));
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token.access_token}`
    })
  };

  postData(formData){
    return this.httpClient.post<any>('http://127.0.0.1:5000/portfolio', formData,this.httpOptions);
  }
  GetAll(){
    return this.httpClient.get('http://127.0.0.1:5000/portfolio',this.httpOptions);
  }
  
}
