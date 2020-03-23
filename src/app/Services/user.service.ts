import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient){

  }

  public login(email,password){
    let data = {'mail':email,'password':password}
    return this.http.post('http://127.0.0.1:5000/login',data);
  }
  public obtenerUsuarioID(id){
    return this.http.get('http://127.0.0.1:5000/user/'+id)
  }
}
