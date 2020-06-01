import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-admin',
  templateUrl: './crear-admin.component.html',
  styleUrls: ['./crear-admin.component.css']
})
export class CrearAdminComponent implements OnInit {

  constructor(private user:UserService) { }
  users:any[];
  data;
  searchArgs:string;
  pageSize = 2;
  p;
  total;
  ngOnInit() {
    this.user.ObtenerUsuarios().subscribe((data:any)=>{
      this.users = data;
      this.data = data;
    })
  }
  Buscar(){
    if(this.searchArgs == '' || this.searchArgs == null){
      this.users = this.data;
      return false;
    }else{
      this.users = []
    for (let usr of this.data){
      let nombre:string = usr.name
      console.log('jander;'+nombre.toLowerCase().includes(this.searchArgs.toLowerCase()))
      if(nombre.toLowerCase().includes(this.searchArgs.toLowerCase()) == true){
        console.log('iguales')
        this.users.push(usr);
      }
    }
  }
  }
  pageChanged($event){
    console.log($event)
    this.p= $event;
  }
  CreateAdmin(usr){
    let user = usr;
    user.rol = 'admin';
    this.user.Update(user).subscribe((data)=>{
      Swal.fire('Exito','Administrador creado','success');
    },(err)=>{
      Swal.fire('Error','Error al crear administrador','error');
    });
  }
  Eliminar(id){
    this.user.Eliminar(id).subscribe((data)=>{
      Swal.fire('Exito','Usuario eliminado con exito','success');
    },(err)=>{
      Swal.fire('Error','Error al eliminar el usuario','error');
    });
  }

}
