import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private user:UserService) { }
  email;
  password;
  ngOnInit() {

  }
  login(){
    this.user.login(this.email,this.password).subscribe((data:any) => {
      console.log(data)
      let id = data._id
      id = id.$oid
      console.log(id)
      localStorage.setItem('token',JSON.stringify(data))
    })
  }


}