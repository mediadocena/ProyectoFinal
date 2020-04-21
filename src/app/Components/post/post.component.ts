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
  points:any[];
  _id = this.route.snapshot.paramMap.get("id");
  ngOnInit() {
    this.post.GetPost(this._id).subscribe((data)=>{
      this.data = data;
      if(this.data.points != ""){
        this.points = this.data.points;
      }else{
        this.points = [];
      }
    });
  }
  Puntuar(){
    let iduser;
    if(localStorage.getItem('token'))
      iduser = JSON.parse(localStorage.getItem('token'))._id.$oid;
    let newrate={
      'id':iduser,
      'rate':this.rate
    }
    this.FindPoints(iduser,newrate);
    this.data.points = this.points;
    console.log(this.data)
    this.post.Update(this.data).subscribe((data)=>{
      console.log(data);
    },(err)=>{
      alert(err);
      console.log(err);
    })
  }

  FindPoints(iduser,newrate){
    let comentUser = false;
    this.points.forEach((val,index)=>{
      if(val.id == iduser){
        comentUser = true;
        this.points[index] == newrate;
      }
    })
    if(comentUser == false){
      this.points.push(newrate);
      console.log(this.points);
    }
  }


}
