import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/post.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(private post:PostService,private user:UserService,private route: ActivatedRoute) { }
  data:any;
  index:number = undefined;
  fulldata;
  username;
  icon;
  _id = this.route.snapshot.paramMap.get("id");
  ngOnInit() {
    if(this._id == JSON.parse(localStorage.getItem('token'))._id.$oid){
      this.username = JSON.parse(localStorage.getItem('token')).name;
      this.icon = JSON.parse(localStorage.getItem('token')).icon;
    }else{
      this.user.obtenerUsuarioID(this._id).subscribe((data:any)=>{
        this.username = data.name;
        this.icon = data.icon;
      })
    }
    this.ObtenerPosts();
  }
  ObtenerPosts(){
    this.post.GetById(this._id).subscribe((data:any)=>{
      this.data = data;
      this.fulldata = data;
    })
  }
  ObtenerModal(i){
    this.index=i;
  }
  Imagenes(){
    this.data = []
    this.fulldata.forEach(element => {
      if(element.category == 'Dibujo/fotografía'){
        this.data.push(element);
      }
    });
  }
  Videos(){
    this.data=[]
    this.fulldata.forEach(element => {
      if(element.category == 'Video'){
        this.data.push(element);
      }
    });
  }
  Musica(){
    this.data=[]
    this.fulldata.forEach(element => {
      if(element.category == 'Música'){
        this.data.push(element);
      }
    });
  }

  Reset(){
    this.data = this.fulldata;
  }
}
