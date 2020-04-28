import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private user:UserService) { }
  data;
  ngOnInit() {
    this.GetAll();
  }

  GetAll(){
    this.data = JSON.parse(localStorage.getItem('token'));
  }
  CambiarNick(){
    
  }
  CambiarContrasena(){
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Siguiente &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Nueva contraseña',
        text: 'Introduzca la nueva contraseña'
      },
      'Repita la contraseña'
    ]).then((result) => {
      if (result.value) {
        if (result.value[0] == result.value[1]){
          this.data.password = result.value[0];
          console.log(this.data.password);
          this.user.Update(this.data).subscribe((data)=>{
            Swal.fire({
              icon:'success',
              title: '¡Hecho!',
              html: `
                Tu contraseña se ha cambiado
              `,
              confirmButtonText: 'Aceptar'
            })
          },(err)=>{
            Swal.fire({
              icon:'error',
              title: 'Ha ocurrido un error',
              html: `
                Tu contraseña no ha sido modificada
              `,
              confirmButtonText: 'Aceptar'
            })
          })
      }else{
        Swal.fire({
          icon:'error',
          title: 'Ha ocurrido un error',
          html: `
            Asegurate de que las contraseñas son iguales
          `,
          confirmButtonText: 'Aceptar'
        })
      }
      }
    })
  }
  async onFileSelect(){
    const { value: file } = await Swal.fire({
      title: 'Seleccione una imagen:',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Subir tu nuevo icono:'
      }
    })
    if (file) {
      const reader = new FileReader()
      reader.onload = (e:any) => {
        Swal.fire({
          title: 'Tu nuevo icono:',
          imageUrl: e.target.result,
          imageAlt: 'Tu nuevo icono'
        })
      }
      reader.readAsDataURL(file)
    }
  }
}
