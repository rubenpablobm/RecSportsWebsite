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
      IdArea:1,
      Nombre:'Tennis',
      Foto:'../assets/images/tenis.jpeg',
      Croquis:'',
      Tipo:'disponibilidad',
      LinkCalendar:'',
      Descripcion:'descripción...',
      Horarios:'8:00am-8:00pm',
      Aviso:'Cerrada el 10 de junio por mantenimiento', 
      IdEdificio:1,
      Aforo:undefined,
      Capacidad:undefined
    },
    {
      IdArea:2,
      Nombre:'Basketball',
      Foto:'../assets/images/basketball.jpeg',
      Croquis:'',
      Tipo:'disponibilidad',
      LinkCalendar:'',
      Descripcion:'descripción...',
      Horarios:'8:00am-8:00pm',
      Aviso:'', 
      IdEdificio:1,
      Aforo:undefined,
      Capacidad:undefined
    },
    {
      IdArea:3,
      Nombre:'Yoga',
      Foto:'https://www.semana.com/resizer/XpO1ppJ0tOduMIim3UjatC94Y2c=/arc-anglerfish-arc2-prod-semana/public/ZP7JALBIIVAC3INWFQRITO6JMQ.jpg',
      Croquis:'',
      Tipo:'instructiva',
      LinkCalendar:'',
      Descripcion:'descripción...',
      Horarios:'L-V 8:00am-8:00pm',
      Aviso:'', 
      IdEdificio:1,
      Aforo:undefined,
      Capacidad:undefined
    },
    {
      IdArea:4,
      Nombre:'Paddel',
      Foto:'https://assets.tennismajors.com/app/uploads/2022/07/14134236/PADEL_SWEDISH_CHAMPIONSHIP-1296x675.jpg',
      Croquis:'',
      Tipo:'disponibilidad',
      LinkCalendar:'',
      Descripcion:'descripción...',
      Horarios:'8:00am-8:00pm',
      Aviso:'', 
      IdEdificio:1,
      Aforo:undefined,
      Capacidad:undefined
    },
    {
      IdArea:5,
      Nombre:'Alberca Borregos',
      Foto:'https://img.gruporeforma.com/imagenes/960x640/6/52/5051851.jpg',
      Croquis:'',
      Tipo:'aforo',
      LinkCalendar:'',
      Descripcion:'descripción...',
      Horarios:'L-V - 8:00am-8:00pm \nS - 9:00am - 5:00pm \nCerrado los domingos por limpieza.',
      Aviso:'Cerrado miércoles 19 de 18:00-20:00 por competencia.', 
      IdEdificio:1,
      Aforo:5,
      Capacidad:10
    },
  ]
}
