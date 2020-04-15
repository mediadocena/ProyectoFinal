import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private user:UserService) { }
  email;
  password;
  password2;
  username;
  ngOnInit() {
  }
  signIn(){
    if(this.password==this.password2){
      let data = {
        'mail':this.email,
        'password':this.password,
        'username':this.username,
        'rol':'user'
      }
      this.user.Post(data).subscribe((dat)=>{
  
      })
  
    }
  }
}
