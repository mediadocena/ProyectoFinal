import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { Track } from 'ngx-audio-player';   
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private post:PostService,private route: ActivatedRoute,private router:Router) { }
  data;
  rate;
  auth = false;
  rol;
  comentario;
  iduser;
  srcVideo;
  VideoActual;
  tituloActual;
  pageSize= 10;
  p;
  total;
  points:any[];
  _id = this.route.snapshot.paramMap.get("id");
  galleryOptions: NgxGalleryOptions[] = [{ "thumbnails": false},
  { "breakpoint": 500, "width": "100%", "height": "auto" }];
  galleryImages: NgxGalleryImage[];
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2,4,6];
  msaapPlaylist: Track[]
  ngOnInit() {
    if(localStorage.getItem("token")){
      this.auth = true;
      let token = JSON.parse(localStorage.getItem('token'));
      this.rol = token.rol
      this.iduser = token._id.$oid;
    }
    this.post.GetPost(this._id).subscribe((data:any)=>{
      this.data = data;

      switch (data.category) {
        case 'Música':
          this.msaapPlaylist = data.archivo;
          break;
          case 'Dibujo-fotografia':
            this.galleryImages = data.archivo;
          break;
          case 'Video':
            this.srcVideo = data.archivo;
            this.VideoActual = data.archivo[0].link;
            this.tituloActual = data.archivo[0].title;
          break;
        default:
          break;
      }
     /* if(data.category == 'Música')
        
      
      if(data.category == 'Dibujo/fotografía')
      this.galleryImages = data.archivo;

      if(data.category == 'Video'){
        this.srcVideo = data.archivo;
        this.VideoActual = data.archivo[0].link;
      }*/

      if(this.data.points != ""){
        this.points = this.data.points;
        this.points.forEach((val,index)=>{
          if(val.id == this.iduser){
            this.rate = val.rate;
          }
        })
      }else{
        this.points = [];
      }
    },(err)=>{
      this.router.navigate(['Home']);
    });
  }
  pageChanged($event){
    console.log($event)
    this.p= $event;
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
      Swal.fire('¡Post puntuado!',`${newrate.rate}`,'info');
    },(err)=>{
      Swal.fire('Error',`${err}`,'error');
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
    if(this.comentario == '' || this.comentario == undefined || this.comentario == null){
      return false;
    }else{
      this.data.coments.push({
        "id":this.iduser,
        "coment":this.comentario,
        "icono":JSON.parse(localStorage.getItem("token")).icon,
        "name":JSON.parse(localStorage.getItem("token")).name
      })
      this.post.Update(this.data).subscribe((data)=>{
        console.log(data);
        this.comentario='';
      },(err)=>{
        console.log(err);
      })
    }
  }
  Eliminar(id){
    this.data.coments.splice(id,1);
    this.post.Update(this.data).subscribe((data)=>{
      console.log(data);
    },(err)=>{
      console.log(err);
    })
  }
  EliminarPost(){
    console.log(this.data._id.$oid)
    this.post.Delete(this.data._id.$oid).subscribe((data)=>{
      this.post.DeleteFile({'files':this.data.archivo}).subscribe((data)=>{
      })
      console.log(data);
    },(err)=>{
      console.log(err);
    })
  }

  ElimModal(){
    Swal.fire({
      title: '¿Desear eliminar el post?',
      text: "No podrás revertir el cambio",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:'no'
    }).then((result) => {
      if (result.value) {
        this.EliminarPost();
        Swal.fire(
          'Eliminado',
          'Se ha eliminado el post',
          'success'
        )
        this.router.navigate(['Home']);
      }
    })
  }

  ChangeVideo(vid){
    this.VideoActual = vid.link;
    this.tituloActual = vid.title;
  }
  AuthorPage(){
    this.router.navigate(['portfolio/'+this.data.autor])
  }

}
