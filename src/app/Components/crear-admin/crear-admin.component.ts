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
  users;
  ngOnInit() {
    this.user.ObtenerUsuarios().subscribe((data)=>{
      this.users = data;
    })
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
