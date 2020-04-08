import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private user:UserService) { }

  ngOnInit() {
  }

  GetAll(){
    this.user.ObtenerUsuarios().subscribe((res)=>{
      console.log(res);
    });
  }
}