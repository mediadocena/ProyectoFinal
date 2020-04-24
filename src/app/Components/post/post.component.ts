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
  auth = false;
  comentario;
  iduser;
  points:any[];
  _id = this.route.snapshot.paramMap.get("id");
  ngOnInit() {
    if(localStorage.getItem("token")){
      this.auth = true;
    }
    this.post.GetPost(this._id).subscribe((data)=>{
      this.data = data;
      if(this.data.points != ""){
        this.points = this.data.points;
        
        if(localStorage.getItem('token')){
          this.iduser = JSON.parse(localStorage.getItem('token'))._id.$oid;
        }
        this.points.forEach((val,index)=>{
          if(val.id == this.iduser){
            this.rate = val.rate;
          }
        })
      }else{
        this.points = [];
      }
    });
  }
  Puntuar(){
    if(localStorage.getItem('token'))
      this.iduser = JSON.parse(localStorage.getItem('token'))._id.$oid;
    let newrate={
      'id':this.iduser,
      'rate':this.rate
    }
    this.FindPoints(this.iduser,newrate);
    this.data.points = this.points;
    console.log(this.data)
    this.post.Update(this.data).subscribe((data)=>{
      
      console.log(this.points);
      alert('Post Puntuado: ' + newrate.rate)
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
        this.points[index] = newrate;
        console.log(this.points[index])
      }
    })
    if(comentUser == false){
      this.points.push(newrate);
      console.log(this.points);
    }
  }
  Comentar(){
    this.data.coments.push({
      "id":this.iduser,
      "coment":this.comentario,
      "icono":JSON.parse(localStorage.getItem("token")).icon,
      "name":JSON.parse(localStorage.getItem("token")).name
    })
    this.post.Update(this.data).subscribe((data)=>{
      console.log(data)
    },(err)=>{
      console.log(err);
    })
  }
  Eliminar(id){
    
  }

}
