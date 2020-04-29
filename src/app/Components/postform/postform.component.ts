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
  uploadForm:FormGroup;
  token:any = JSON.parse(localStorage.getItem('token'));
  tags;
  constructor(private formBuilder:FormBuilder,private post:PostService) { 
  }


  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: [''],
      titulo: [''],
      text:[''],
      category:[''],
      author:this.token._id.$oid,
      tags:[]
    });
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.uploadForm.get('file').setValue(file);
    }
  }
  onSubmit() {
    if(this.uploadForm.get('file').value == '' || 
        this.uploadForm.get('titulo').value == '' ||
        this.uploadForm.get('text').value == ''){

       console.log(this.uploadForm.get('file').value)
       
      return Swal.fire('Error','Por favor, rellene todos los campos','error');
      
    }
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);
    formData.append('titulo', this.uploadForm.get('titulo').value);
    formData.append('text', this.uploadForm.get('text').value);
    formData.append('author', this.uploadForm.get('author').value);
    formData.append('category', this.uploadForm.get('category').value);
    formData.append('totalpoints','0');
    let arr:any[]=[];
    console.log(this.uploadForm.get('tags').value);
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
  }

}