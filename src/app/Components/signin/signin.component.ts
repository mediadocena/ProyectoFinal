import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private user:UserService,private router:Router) { }
  email;
  password;
  password2;
  username;
  ngOnInit() {
    if(localStorage.getItem('token')){
      this.router.navigate(['/Home']);
    }
  }
  signIn(){
    if(this.password==this.password2){
      let data = {
        'mail':this.email,
        'password':this.password,
        'username':this.username,
        'icono':'https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_960_720.png',
        'rol':'user'
      }
      this.user.Post(data).subscribe((dat)=>{
        alert('User created')
        window.location.reload();
      },(err)=>{
        alert('Error:' + err.error.msg);
      })
  
    }
  }
}
