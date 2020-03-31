import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth:AuthService) { }
  logged:boolean = false;
  rol;
  icono = 'https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_960_720.png';
  ngOnInit() {
    if(this.auth.isAuthenticated()){
      this.logged = true;
    }
  }
  delogin(){

  }

}
