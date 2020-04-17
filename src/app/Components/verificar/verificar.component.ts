import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.css']
})
export class VerificarComponent implements OnInit {

  constructor(public router: Router,private route: ActivatedRoute,private user:UserService) { }
  
  ngOnInit() {
    if (localStorage.getItem('token')){
      let verified = JSON.parse(localStorage.getItem('token')).verified;
      if(verified == 'true'){
      this.router.navigate(['/Home']);
      }else{
        localStorage.removeItem('token');
      }
    }else{
      this.user.Confirm(this.route.snapshot.paramMap.get('id')).subscribe(()=>{
        this.router.navigate(['/login']);
      })
    }
  }

}
