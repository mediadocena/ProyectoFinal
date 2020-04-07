import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private post:PostService) { }

  data:[any]; 

  ngOnInit() {
    this.ObtenerPosts()
  }

  ObtenerPosts(){
    this.post.GetAll().subscribe((data:any)=>{
      this.data = data;
    })
  }

}
