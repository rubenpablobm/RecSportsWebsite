import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from '../../service/crud.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styleUrls: ['./cambio-contrasena.component.css']
})

@Injectable()
export class CambioContrasenaComponent {
  
  mensaje:string="";
  formLogin:FormGroup;

  constructor(public formulario:FormBuilder,
    private http: HttpClient,
    private crudService:CrudService,
    private ruteador:Router){
      this.formLogin=this.formulario.group({
        Email:[''],
        Contrasena:[''],
        RepContrasena:['']
      });
    }

  /*  mensaje:string="";
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
      }*/


 

  enviarDatos(){
    // console.log();
    // console.log(this.formLogin.get( 'RepContrasena'));
  
    //if (!Contrasena || !RepContrasena) {
     // this.mensaje = 'Proceso incorrecto , intente de nuevo';
      //return;
    //}
    //console.log(this.formLogin.value);
    console.log("Hola");
    console.log(this.formLogin.value.correo);
    this.crudService.CambioContraseña(this.formLogin.value).subscribe( respuesta =>{
      console.log("-----------")
      console.log(this.formLogin.value);
      console.log(respuesta);
      console.log("-----------")
      //si fue positiva la respuesta, activa el verificador admin
      this.crudService.AdminLoginAuth();
      //redirige a pagina principal
      this.ruteador.navigateByUrl('0');
    },(error) => {
      console.log(error);
      this.mensaje=String(error.error);
    })
  }
}

