/* Descripcion de admin.component.ts: programa que define la logica del componente "admin". 
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 11/05/2023
Fecha de modificacion: 15/06/2023 */

// Declaracion de importaciones
import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { CrudService } from '../service/crud.service';

// Decorador del componente
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {
  mensaje:string="";
  formLogin:FormGroup;

  constructor(public formulario:FormBuilder,
    private crudService:CrudService,
    private ruteador:Router){
      this.formLogin=this.formulario.group({
        Email:[''],
        Contrasena:[''],
        RepContrasena:['']
      });
    }

    enviarDatos(){
      this.crudService.AdminLogin(this.formLogin.value).subscribe( respuesta =>{
        //Si fue positiva la respuesta, activa el verificador admin
        this.crudService.AdminLoginAuth();
        //Redirige a pagina principal
        this.ruteador.navigateByUrl('');
      },(error) => {
        this.mensaje=String(error.error);
      })
    }
}
