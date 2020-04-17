import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token; 
  httpOptions;
  constructor(private http:HttpClient){
    if(JSON.parse(localStorage.getItem('token'))){
      this.token = JSON.parse(localStorage.getItem('token')).access_token;
    }else{
      this.token = ''
    }
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    };
  }
  public login(email,password){
    let data = {'mail':email,'password':password}
    return this.http.post('http://127.0.0.1:5000/login',data);
  }
  public obtenerUsuarioID(id){
    return this.http.get('http://127.0.0.1:5000/user/'+id)
  }
  public ObtenerUsuarios(){
    return this.http.get('http://127.0.0.1:5000/user',this.httpOptions)
  }
  public Delog(){
    return this.http.delete('http://127.0.0.1:5000/logout',this.httpOptions);
  }
  public Post(data){
    return this.http.post('http://127.0.0.1:5000/postuser',data);
  }
  public Confirm(id){
    return this.http.get('http://127.0.0.1:5000/Confirm/'+id);
  }
}
