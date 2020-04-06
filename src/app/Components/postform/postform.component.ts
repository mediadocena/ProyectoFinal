import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.css']
})
export class PostformComponent implements OnInit {
  uploadForm:FormGroup;
  token:any = JSON.parse(localStorage.getItem('token'));
  
  constructor(private formBuilder:FormBuilder,private post:PostService) { 
  }


  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: [''],
      titulo: [''],
      text:[''],
      author:this.token._id.$oid
    });
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);
    formData.append('titulo', this.uploadForm.get('titulo').value);
    formData.append('text', this.uploadForm.get('text').value);
    formData.append('author', this.uploadForm.get('author').value);
    console.log(formData.get('titulo'))
    this.post.postData(formData).subscribe(
      ok=>{console.log('ok')},
      err=>{console.log('err')}
    )
  }

}