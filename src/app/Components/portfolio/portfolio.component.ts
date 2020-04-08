import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(private post:PostService) { }
  data:any;
  ngOnInit() {
    this.ObtenerPosts();
  }
  ObtenerPosts(){
    this.post.GetAll().subscribe((data:any)=>{
      this.data = data;
    })
  }
}