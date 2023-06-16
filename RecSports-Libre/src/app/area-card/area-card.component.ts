/* Descripcion de area-card.component.ts: programa que define la logica del componente "area-card". 
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Ruben Barraza.
Fecha de creacion: 03/04/2023
Fecha de modificacion: 15/06/2023 */

// Declaracion de importaciones
import { Component, Input } from '@angular/core';
import { Area } from '../models/area'; //No se usa
import { CrudService } from 'src/app/service/crud.service';
import { authGuard } from '../service/auth.guard';


// Decorador del componente
@Component({
  selector: 'app-area-card',
  templateUrl: './area-card.component.html',
  styleUrls: ['./area-card.component.css']
})

export class AreaCardComponent {

  // Propiedades de entrada
  @Input() idEdificio!: any;
  @Input() tipoArea!: string;
  @Input() listaAreas : any = [];

  auth!: boolean;

  // Datos de titulos de areas
  titulos : any = [
    {
      tipo : 'Aforo',
      titulo : 'Áreas de aforo',
      desc : 'Son áreas donde debes registrar tu entrada y salida.',
    },
    {
      tipo : 'Instructiva',
      titulo : 'Clases instructivas',
      desc : 'Son clases que puedes registrar individualmente en cualquier momento del semestre.',
    },
    {
      tipo : 'Disponibilidad',
      titulo : 'Áreas de disponibilidad',
      desc : 'Son áreas abiertas que puedes reservar si lo necesitas.'
    }
  ]

  constructor(public crudService:CrudService){ 
    this.auth=authGuard();
  }
}
