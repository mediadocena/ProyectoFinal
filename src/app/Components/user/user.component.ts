import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private user:UserService) { }
  data;
  ngOnInit() {
    this.GetAll();
  }

  GetAll(){
    this.data = JSON.parse(localStorage.getItem('token'));
  }
  CambiarNick(){
    
  }
}
