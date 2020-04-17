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
  rate;
  _id = this.route.snapshot.paramMap.get("id");
  ngOnInit() {
    this.post.GetPost(this._id).subscribe((data)=>{
      this.data = data;
    });
  }
  Puntuar(){
    let iduser;
    if(localStorage.getItem('token'))
      iduser = JSON.parse(localStorage.getItem('token')).id.$oid;
    let newrate={
      'id':iduser,
      'rate':this.rate
    }
    let updateItem = this.data.points.find(this.data.points.id,iduser);
    let index = this.data.points.indexOf(updateItem);
    this.data.points[index] = newrate;
    
    this.post.Update(this.data).subscribe((data)=>{
      console.log('Update');
    },(err)=>{
      alert(err);
      console.log(err);
    })
  }


}
