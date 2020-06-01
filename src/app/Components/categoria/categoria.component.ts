import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/post.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  constructor(private post:PostService,private route:ActivatedRoute) { }
  data;
  category = this.route.snapshot.paramMap.get("category");
  pageSize = 6;
  p;
  total;
  ngOnInit() {
    this.post.GetByCategory(this.category).subscribe((data)=>{
      this.data = data;
    })
  }
  pageChanged($event){
    console.log($event)
    this.p= $event;
  }

}
