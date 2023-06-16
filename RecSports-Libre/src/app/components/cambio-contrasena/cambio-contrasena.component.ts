/* Descripcion de cambio-contrasena.component.ts: programa que define la logica del componente "cambio-contrasena".
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 01/06/2023
Fecha de modificacion: 15/06/2023 */

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
  mostrarOverlay: boolean = false;
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

  enviarDatos(){
    this.crudService.CambioContraseña(this.formLogin.value).subscribe( respuesta =>{
      setTimeout(() => {
        window.alert("Contraseña cambiada exitosamente");
        //Redirige a inicio sesion, sin logear como admin
        this.ruteador.navigateByUrl('');
        }, 100);
    },(error) => {
      this.mensaje=String(error.error);
    });
  }
}

