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
      console.log(respuesta);
      setTimeout(() => {
        window.alert("Contraseña cambiada exitosamente");
        //redirige a inicio sesion, sin logear como admin
        this.ruteador.navigateByUrl('/admin/login');
        }, 100);
    },(error) => {
      console.log(error);
      this.mensaje=String(error.error);
    });
  }
}

