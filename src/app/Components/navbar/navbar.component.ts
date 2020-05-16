import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth:AuthService,private user:UserService) { }
  logged:boolean = false;
  rol;
  icono;
  _id;

  ngOnInit() {
    if(this.auth.isAuthenticated()){
      this.icono = JSON.parse(localStorage.getItem('token')).icon;
      this._id = JSON.parse(localStorage.getItem('token'))._id.$oid;
      this.logged = true;
      this.rol = JSON.parse(localStorage.getItem('token')).rol;
    }else{
      this.logged = false;
    }
    console.log(localStorage.getItem('token'))
  }
  delogin(){
    this.user.Delog().subscribe((data)=>{
      localStorage.removeItem('token');
      window.location.reload();
    });
    
  
  }

}
