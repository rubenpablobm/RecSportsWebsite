/* Descripcion de editar-edificio.component.ts: programa que define la logica del componente "editar-edificio".
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: 15/05/2023
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
	selector: 'app-editar-edificio',
	templateUrl: './editar-edificio.component.html',
	styleUrls: ['./editar-edificio.component.css']
})

export class EditarEdificioComponent {
	// Variables
	eID : any = null;
	edificio : any = [];
	mensaje?:string;
	theIdEdificio:any;
	// Grupo de formulario para recolectar datos del formulario
	formularioDeEdificios: FormGroup;
  
	// Constructor con dependencias inyectadas
	constructor(private route: ActivatedRoute, private htttp: HttpClient, private ruteador: Router, public crudService:CrudService, public formulario: FormBuilder) { 
    // Obtener el parametro 'IdEdificio' de la ruta
    this.theIdEdificio=this.route.snapshot.paramMap.get('IdEdificio');
    console.log(this.theIdEdificio);
    // Recuperar los datos del edificio si 'theIdEdificio' tiene un valor
    if (this.theIdEdificio) {
      this.crudService.EdificioGet(this.theIdEdificio).subscribe(respuesta =>{
        console.log(respuesta);
        // Establecer los valores del formulario con los datos recuperados
        this.formularioDeEdificios.setValue({
          Nombre: respuesta[0]['Nombre'],
          Foto: respuesta[0]['Foto'],
          LinkMaps: respuesta[0]['LinkMaps'],
        });
      },
      (error) => {
        this.mensaje=String(error.error);
      })
    }
    // Crear el grupo de formulario
    this.formularioDeEdificios=this.formulario.group({
        Nombre: [''],
        Foto: [''],
        LinkMaps: ['']
    });
	}

  // ngOnInit(){
  //   const idEdificio = this.route.snapshot.paramMap.get('idEdificio');
  //   this.eID = idEdificio;
  //   return this.crudService.EdificioGet(this.eID).subscribe((data:{}) => {
  //     this.edificio = data;
  //     console.log(this.edificio);
  //   })
  // }

	// Metodo para manejar el envio del formulario
  enviarDatos(){
    console.log("Presionaste el boton enviar datos")
    console.log(this.formularioDeEdificios.value);
		// Llamar al servicio para actualizar el edificio
    this.crudService.EdificioUpdate(this.theIdEdificio, this.formularioDeEdificios.value).subscribe(respuesta => {
      console.log("Super")
    },
    (error) => {
      this.mensaje=String(error.error);
    })
  }
}
