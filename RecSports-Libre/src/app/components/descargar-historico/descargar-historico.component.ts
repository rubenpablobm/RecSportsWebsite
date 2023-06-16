/* Descripcion de descargar-historico.component.ts: programa que define la logica del componente 
"descargar-historico".
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 01/06/2023
Fecha de modificacion: 15/06/2023 */

import { Component } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { JsonCsvService } from 'src/app/service/json-csv.service';
import { saveAs } from 'file-saver';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgFor, NgIf, JsonPipe } from '@angular/common';
import { Fecha } from 'src/app/models/fecha';

@Component({
  selector: 'app-descargar-historico',
  templateUrl: './descargar-historico.component.html',
  styleUrls: ['./descargar-historico.component.css'],
})
export class DescargarHistoricoComponent {
  // Variables
  listaAreas : any = [];
  listaHoraDia : any = [];
  selected! : number;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  fechaRange = new Fecha;

  constructor(public crudService:CrudService , private jsonCsvSerice:JsonCsvService){ }

  // Metodo para llamara el metodo getEdificios por cada iteracion
  ngOnInit() {
    // Lanza dropdown
    this.getAreas(); 
  }
  
  // Metodo para obtener los edificios
  getAreas() {
    console.log('Generando dropdown de navbar...')
    return this.crudService.AreaGetMultiple().subscribe((data:{}) => {
      this.listaAreas = data;
    })
  }

  getEstadisticaHora(){
    console.log('Descargando estadisticas de area '+ this.selected +' por hora...')
    if(this.range.value.start != null && this.range.value.end != null){
      // Revisado que no hay nulos, los asigna a fechaRange
      this.fechaRange.diaInicio = this.range.value.start;
      this.fechaRange.diaFin = this.range.value.end;
      // Llamamos service
      return this.crudService.HoraGet(this.selected, this.fechaRange).subscribe((data:{}) => {
        this.listaHoraDia = data;
        let newHeaders = ["IdHora", "Aforo", "Capacidad", "IdArea", "Hora", "Nombre"];
        this.jsonCsvSerice.downloadFile(data,'jsontocsv',newHeaders);
      }); 
    } else {
      return 0;
    }
  }

  getEstadisticaDia(){
    console.log('Descargando estadisticas de area '+ this.selected +' acumulado diario...')
    if(this.range.value.start != null && this.range.value.end != null){
      // Revisado que no hay nulos, los asigna a fechaRange
      this.fechaRange.diaInicio = this.range.value.start;
      this.fechaRange.diaFin = this.range.value.end;
      // Llamamos service
      return this.crudService.DiaGet(this.selected, this.fechaRange).subscribe((data:{}) => {
        this.listaHoraDia = data;
        let newHeaders = ["IdDia", "TotalPersonas", "IdArea", "Dia", "Nombre"];
        this.jsonCsvSerice.downloadFile(data,'jsontocsv', newHeaders);  
      });
    } else {
      return 0;
    }
  }
}
