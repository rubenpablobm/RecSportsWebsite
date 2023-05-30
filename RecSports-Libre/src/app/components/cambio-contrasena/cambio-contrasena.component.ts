import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from '../../service/crud.service';


@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styleUrls: ['./cambio-contrasena.component.css']
})
export class CambioContrasenaComponent {
    mensaje:string="";
    formLogin:FormGroup;
  
    constructor(public formulario:FormBuilder,
      private crudService:CrudService,
      private ruteador:Router){
        this.formLogin=this.formulario.group({
          //Email:[''],
          ContraseñaActual:[''],
          NuevaContraseña:[''],
          Repetircontraseña:['']
        });
      }
  
      enviarDatos(){
        //console.log(this.formLogin.value);
        this.crudService.CambioContraseña(this.formLogin.value).subscribe( respuesta =>{
          console.log(respuesta);
          this.ruteador.navigateByUrl('0');
        },(error) => {
          console.log(error);
          this.mensaje=String(error.error);
        })
      }



}