/* Descripcion de comp.component.ts: programa que define la logica del componente "comp". 
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 19/05/2023 */

// Declaracion de importaciones
import { Component, Input } from '@angular/core';
import { Area } from '../models/area';
import { CrudService } from 'src/app/service/crud.service';

// Decorador del componente
@Component({
  selector: 'app-comp',
  templateUrl: './comp.component.html',
  styleUrls: ['./comp.component.css']
})

export class CompComponent {

  // Propiedades de entrada
  @Input() linkFoto? : string;
  @Input() descripcion! : string;
  @Input() idEdificio!: any;
  @Input() tipoArea!: string;
  @Input() listaAreas : any = [];
  // Informacion de los titulos
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

  // Metodo para ejecutar el metodo getArea()
  ngOnInit() {
    this.getArea();
  }

  getArea(){
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
}
