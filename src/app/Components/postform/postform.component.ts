import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostService } from 'src/app/Services/post.service';
import Swal from 'ngx-angular8-sweetalert2';
@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.css']
})
export class PostformComponent implements OnInit {
  
  token:any = JSON.parse(localStorage.getItem('token'));
  uploadForm:FormGroup = this.formBuilder.group({
    file: [''],
    titulo: [''],
    text:[''],
    category:[''],
    author:this.token._id.$oid,
    tags:[]
  });
  tags;
  filenames:any[] = [];
  fileData = new FormData();
  constructor(private formBuilder:FormBuilder,private post:PostService) { 
  }
  ngOnInit() {
  
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files;
      let count = 0;
      for (let fil of file){
        this.fileData.append(`file${count}`,fil);
        console.log(fil);
        console.log(this.filenames)
        count++;
      }
    
    }
  }
  onSubmit() {
    if( 
        this.uploadForm.get('titulo').value == '' ||
        this.uploadForm.get('text').value == ''){

       console.log(this.uploadForm.get('file').value)
       
      return Swal.fire('Error','Por favor, rellene todos los campos','error');
      
    }
    const formData = new FormData();
    formData.append('titulo', this.uploadForm.get('titulo').value);
    formData.append('text', this.uploadForm.get('text').value);
    formData.append('author', this.uploadForm.get('author').value);
    formData.append('category', this.uploadForm.get('category').value);
    formData.append('totalpoints','0');
    this.fileData.append('Autor',this.uploadForm.get('author').value);
    this.fileData.append('PostName',this.uploadForm.get('titulo').value);
    this.fileData.append('category',this.uploadForm.get('category').value);
    this.post.UploadFile(this.fileData).subscribe((data:any)=>{
      this.filenames = data;
      
      formData.append('file', JSON.stringify(this.filenames));

      let arr:any[]=[];
      console.log(this.filenames);
      let item = this.uploadForm.get('tags').value
      if(item != null){
        for(let itm of item){
          arr.push(itm.value);
        }
      }else{
        item = "";
      }
      formData.append('tags', arr.toString());
  
      console.log(formData.get('titulo'),formData.get('category'));
      this.post.postData(formData).subscribe(
        ok=>{
          console.log('ok')
          Swal.fire('Done!','Se ha añadido el trabajo a tu portfolio','success');
          window.location.reload();
      },
        err=>{console.log('err')}
      )
    },(err)=>{
      Swal.fire({
        icon:'error',
        title: 'Error',
        html: 'Ya existe un post con ese titulo',
        confirmButtonText: 'Aceptar'
      })
    });
    
  }

}