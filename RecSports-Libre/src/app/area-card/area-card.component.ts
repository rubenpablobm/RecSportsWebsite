import { Component } from '@angular/core';
import { Area } from '../models/area';

@Component({
  selector: 'app-area-card',
  templateUrl: './area-card.component.html',
  styleUrls: ['./area-card.component.css']
})
export class AreaCardComponent {
  listaAreas : Area[] = [
    {
      nombre:'Tennis',
      foto:'../assets/images/tenis.jpeg',
      croquis:'',
      tipo:'disponibilidad',
      linkCalendar:'',
      descripcion:'descripción...',
      horarios:'8:00am-8:00pm',
      aviso:'Cerrada el 10 de junio por mantenimiento', 
      idEdificio:1
    },
    {
      nombre:'Basketball',
      foto:'../assets/images/basketball.jpeg',
      croquis:'',
      tipo:'disponibilidad',
      linkCalendar:'',
      descripcion:'descripción...',
      horarios:'8:00am-8:00pm',
      aviso:'', 
      idEdificio:1
    },
  ]
}
