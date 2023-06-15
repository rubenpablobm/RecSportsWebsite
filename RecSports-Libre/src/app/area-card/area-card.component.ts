/* Descripcion de area-card.component.ts: programa que define la logica del componente "area-card". 
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 18/05/2023 */

// Declaracion de importaciones
import { Component, Input } from '@angular/core';
import { Area } from '../models/area'; //No se usa
import { CrudService } from 'src/app/service/crud.service';

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

  constructor(public crudService:CrudService){ }
  
  // Obtener areas desde la API
  ngOnInit() {
    this.getArea();
  }

  getArea(){
    /* Preguntar por comentarios: ¿los necesitamos? */
    /*
    console.log("voy a llamar a la API :)");
    return this.crudService.AreaGetMultiple().subscribe((data:{})=>{
      console.log(data);
      this.listaAreas=data;
    })
    
    return this.crudService.AreaGetXedificio(this.idEdificio).subscribe((data : {}) => {
      console.log("Getting areas from ID edificio:" + this.idEdificio);
      this.listaAreas=data;
      console.log(this.listaAreas)
    });
    */
  }

  /* Preguntar por comentarios: ¿los necesitamos? */
  // listaAreas : Area[] = [
  //   {
  //     IdArea:1,
  //     Nombre:'Tennis',
  //     Foto:'../assets/images/tenis.jpeg',
  //     Croquis:'',
  //     Tipo:'disponibilidad',
  //     LinkCalendar:'',
  //     Descripcion:'descripción...',
  //     Horarios:'8:00am-8:00pm',
  //     Avisos:'Cerrada el 10 de junio por mantenimiento', 
  //     IdEdificio:1,
  //     Aforo:undefined,
  //     Capacidad:undefined
  //   },
  //   {
  //     IdArea:2,
  //     Nombre:'Basketball',
  //     Foto:'../assets/images/basketball.jpeg',
  //     Croquis:'',
  //     Tipo:'disponibilidad',
  //     LinkCalendar:'',
  //     Descripcion:'descripción...',
  //     Horarios:'8:00am-8:00pm',
  //     Avisos:'', 
  //     IdEdificio:1,
  //     Aforo:undefined,
  //     Capacidad:undefined
  //   },
  //   {
  //     IdArea:3,
  //     Nombre:'Yoga',
  //     Foto:'https://www.semana.com/resizer/XpO1ppJ0tOduMIim3UjatC94Y2c=/arc-anglerfish-arc2-prod-semana/public/ZP7JALBIIVAC3INWFQRITO6JMQ.jpg',
  //     Croquis:'',
  //     Tipo:'instructiva',
  //     LinkCalendar:'',
  //     Descripcion:'descripción...',
  //     Horarios:'L-V 8:00am-8:00pm',
  //     Avisos:'', 
  //     IdEdificio:1,
  //     Aforo:undefined,
  //     Capacidad:undefined
  //   },
  //   {
  //     IdArea:4,
  //     Nombre:'Paddel',
  //     Foto:'https://assets.tennismajors.com/app/uploads/2022/07/14134236/PADEL_SWEDISH_CHAMPIONSHIP-1296x675.jpg',
  //     Croquis:'',
  //     Tipo:'disponibilidad',
  //     LinkCalendar:'',
  //     Descripcion:'descripción...',
  //     Horarios:'8:00am-8:00pm',
  //     Avisos:'', 
  //     IdEdificio:1,
  //     Aforo:undefined,
  //     Capacidad:undefined
  //   },
  //   {
  //     IdArea:5,
  //     Nombre:'Alberca Borregos',
  //     Foto:'https://img.gruporeforma.com/imagenes/960x640/6/52/5051851.jpg',
  //     Croquis:'',
  //     Tipo:'aforo',
  //     LinkCalendar:'',
  //     Descripcion:'descripción...',
  //     Horarios:'L-V - 8:00am-8:00pm \nS - 9:00am - 5:00pm \nCerrado los domingos por limpieza.',
  //     Avisos:'Cerrado miércoles 19 de 18:00-20:00 por competencia.', 
  //     IdEdificio:1,
  //     Aforo:5,
  //     Capacidad:10
  //   },
  // ]
}
