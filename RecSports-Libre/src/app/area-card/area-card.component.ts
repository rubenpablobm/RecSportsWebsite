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
      idArea:1,
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
      idArea:2,
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
    {
      idArea:3,
      nombre:'Yoga',
      foto:'https://www.semana.com/resizer/XpO1ppJ0tOduMIim3UjatC94Y2c=/arc-anglerfish-arc2-prod-semana/public/ZP7JALBIIVAC3INWFQRITO6JMQ.jpg',
      croquis:'',
      tipo:'instructiva',
      linkCalendar:'',
      descripcion:'descripción...',
      horarios:'L-V 8:00am-8:00pm',
      aviso:'', 
      idEdificio:1
    },
    {
      idArea:4,
      nombre:'Paddel',
      foto:'https://assets.tennismajors.com/app/uploads/2022/07/14134236/PADEL_SWEDISH_CHAMPIONSHIP-1296x675.jpg',
      croquis:'',
      tipo:'disponibilidad',
      linkCalendar:'',
      descripcion:'descripción...',
      horarios:'8:00am-8:00pm',
      aviso:'', 
      idEdificio:1
    },
    {
      idArea:5,
      nombre:'Alberca Borregos',
      foto:'https://img.gruporeforma.com/imagenes/960x640/6/52/5051851.jpg',
      croquis:'',
      tipo:'disponibilidad',
      linkCalendar:'',
      descripcion:'descripción...',
      horarios:'L-V - 8:00am-8:00pm \nS - 9:00am - 5:00pm \nCerrado los domingos por limpieza.',
      aviso:'Cerrado miércoles 19 de 18:00-20:00 por competencia.', 
      idEdificio:1
    },
  ]
}
