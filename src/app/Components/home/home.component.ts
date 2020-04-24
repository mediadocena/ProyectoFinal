import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private post:PostService) { }

  data:any[]; 
  fulldata:any[];
  searchArgs:string;
  ngOnInit() {
    this.ObtenerPosts();
    
  }

  ObtenerPosts(){
    this.post.GetAll().subscribe((data:any)=>{
      this.data = data;
      this.fulldata = data; 
    })
  }
  Buscar(searchArgs:string){
    if(searchArgs == '' || searchArgs == undefined || searchArgs == null){
      this.data = this.fulldata;
    }else{
      this.data = [];
      var BreakException = {};
      this.fulldata.forEach((dat:any) => {
        if(dat.tags){
          try{
          dat.tags.forEach(element => {
            if(element.toLowerCase().search(this.searchArgs.toLowerCase()) != -1){
              this.data.push(dat);
              throw BreakException;
            }
          });
          }catch(e){
            if (e !== BreakException) throw e;
          }
        }
        if (dat.titulo.toLowerCase().search(this.searchArgs.toLowerCase()) != -1 ||
          dat.autor.toLowerCase().search(this.searchArgs.toLowerCase()) != -1) {
          this.data.push(dat);
        }
      })
    }
  }

}
