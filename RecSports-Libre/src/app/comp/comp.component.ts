import { Component, Input } from '@angular/core';
import { Area } from '../models/area';

import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-comp',
  templateUrl: './comp.component.html',
  styleUrls: ['./comp.component.css']
})
export class CompComponent {
  @Input() linkFoto? : string;
  @Input() descripcion! : string;
  @Input() idEdificio!: any;
  @Input() tipoArea!: string;

  @Input() listaAreas : any = [];

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

  ngOnInit() {
    this.getArea();
  }

  constructor(public crudService:CrudService){ }
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
