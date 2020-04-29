import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private user:UserService,private router:Router) { }
  email;
  password;
  ngOnInit() {
    if(localStorage.getItem('token')){
      this.router.navigate(['/Home']);
    }
  }
  login(){
    this.user.login(this.email,this.password).subscribe((data:any) => {
      console.log(data)
      let id = data._id
      id = id.$oid
      console.log(id)
      localStorage.setItem('token',JSON.stringify(data))
      window.location.reload();
    },(err)=>{
      Swal.fire('Error',
      'Email o contraseña incorrectos',
      'error')
    })
  }


}