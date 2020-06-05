import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/post.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(private post:PostService,private user:UserService,private route: ActivatedRoute) {
    if(localStorage.getItem('token')){
      this.actualid=  JSON.parse(localStorage.getItem('token'))._id.$oid;
    }
   }
  data:any;
  index:number = undefined;
  fulldata;
  username;
  description;
  titulos;
  icon;
  pageSize= 9;
  p;
  total;
  editmode:boolean = false;
  _id = this.route.snapshot.paramMap.get("id");
  actualid;
  ngOnInit() {
    if(localStorage.getItem('token') && this._id == this.actualid){
        this.username = JSON.parse(localStorage.getItem('token')).name;
        this.icon = JSON.parse(localStorage.getItem('token')).icon;
        this.description = JSON.parse(localStorage.getItem('token')).banner;
        this.titulos = JSON.parse(localStorage.getItem('token')).category; 
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
      if(element.category == 'Dibujo-fotografia'){
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
  pageChanged($event){
    console.log($event)
    this.p= $event;
  }
  editar(){
  let user = JSON.parse(localStorage.getItem('token'));
  user.banner = this.description;
  user.category = this.titulos;
    this.user.Update(user).subscribe((data)=>{
      this.editmode = false;
      localStorage.removeItem('token');
      localStorage.setItem('token',JSON.stringify(user));
      Swal.fire('OK','Descripción modificada','success');
    })
  }
}
