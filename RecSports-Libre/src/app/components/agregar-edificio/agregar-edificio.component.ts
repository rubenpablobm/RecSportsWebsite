/* Descripcion de agregar-edificio.component.ts: programa que define la logica del componente "agregar-edificio".
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: 16/05/2023
Fecha de modificacion: 17/05/2023 */

// Declaracion de importaciones
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';

// Decorador del componente
@Component({
  selector: 'app-agregar-edificio',
  templateUrl: './agregar-edificio.component.html',
  styleUrls: ['./agregar-edificio.component.css']
})
export class AgregarEdificioComponent {
  // Variables
  mensaje?:string;
  // Grupo de formulario para recolectar datos del formulario
  formularioDeEdificios: FormGroup;

  // Constructor con dependencias inyectadas
  constructor(private route: ActivatedRoute, private htttp: HttpClient, private ruteador: Router, public crudService:CrudService, public formulario: FormBuilder) { 
    // Crear el grupo de formulario
    this.formularioDeEdificios=this.formulario.group({
      Nombre: [''],
      Foto: [''],
      LinkMaps: ['']
    });
  }
  
  // Metodo para manejar el envio del formulario
  enviarDatos(){
    console.log("Presionaste el boton enviar datos")
    console.log(this.formularioDeEdificios.value);
    // Llamar al servicio para agregar el edificio
    this.crudService.EdificioPost(this.formularioDeEdificios.value).subscribe(respuesta => {
      console.log("Super")
    },
    (error) => {
      this.mensaje=String(error.error);
    })
  }

}
