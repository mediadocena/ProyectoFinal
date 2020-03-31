import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsloggedService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    let bol:boolean = false;
    let token = localStorage.getItem('token');
    //Comprobamos si existe token en local:
    if(token != null){
      if (this.auth.isAuthenticated()) {
          this.router.navigate(['/Home']);
          bol = false;
      }
      bol = true;
    }else{
      bol = true;
    }
  return bol;
}
}