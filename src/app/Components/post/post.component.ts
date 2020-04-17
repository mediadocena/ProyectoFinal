import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private post:PostService,private route: ActivatedRoute) { }
  data;
  _id = this.route.snapshot.paramMap.get("id");
  ngOnInit() {
    this.post.GetPost(this._id).subscribe((data)=>{
      this.data = data;
    });
  }

}
