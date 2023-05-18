import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { CrudService } from '../service/crud.service';

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
      //console.log(this.formLogin.value);
      this.crudService.AdminLogin(this.formLogin.value).subscribe( respuesta =>{
        console.log(respuesta);
        this.ruteador.navigateByUrl('0');
      },(error) => {
        console.log(error);
        this.mensaje=String(error.error);
      })
    }
}
