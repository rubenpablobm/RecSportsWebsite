import { Component } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

import { JsonCsvService } from 'src/app/service/json-csv.service';
import { saveAs } from 'file-saver';
/*
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
*/
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgFor, NgIf, JsonPipe } from '@angular/common';

import { Fecha } from 'src/app/models/fecha';

@Component({
  selector: 'app-descargar-historico',
  templateUrl: './descargar-historico.component.html',
  styleUrls: ['./descargar-historico.component.css'],
  //standalone:true,
  //imports: [MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, NgFor, FormGroup],
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

  //
  constructor(public crudService:CrudService , private jsonCsvSerice:JsonCsvService){ }

  // Metodo para llamara el metodo getEdificios por cada iteracion
  ngOnInit() {
    this.getAreas(); //lanza dropdown
  }
  
  // Metodo para obtener los edificios
  getAreas() {
    console.log('Generando dropdown de navbar...')
    return this.crudService.AreaGetMultiple().subscribe((data:{}) => {
      this.listaAreas = data;
      console.log(data);
    })
  }

  getEstadisticaHora(){
    console.log('Descargando estadisticas de area '+ this.selected +' por hora...')
    if(this.range.value.start != null && this.range.value.end != null){
      //revisado que no hay nulos, los asigna a fechaRange
      this.fechaRange.diaInicio = this.range.value.start;
      this.fechaRange.diaFin = this.range.value.end;
      //llamamos service
      return this.crudService.HoraGet(this.selected, this.fechaRange).subscribe((data:{}) => {
        this.listaHoraDia = data;
        console.log(this.listaHoraDia);
        let newHeaders = ["IdHora", "Aforo", "Capacidad", "IdArea", "Hora", "Nombre"];
        this.jsonCsvSerice.downloadFile(data,'jsontocsv',newHeaders);
      });
      
    }else{
      return 0;
    }
  }
  getEstadisticaDia(){
    console.log('Descargando estadisticas de area '+ this.selected +' acumulado diario...')
    if(this.range.value.start != null && this.range.value.end != null){
      //revisado que no hay nulos, los asigna a fechaRange
      this.fechaRange.diaInicio = this.range.value.start;
      this.fechaRange.diaFin = this.range.value.end;
      //llamamos service
      return this.crudService.DiaGet(this.selected, this.fechaRange).subscribe((data:{}) => {
        this.listaHoraDia = data;
        console.log(this.listaHoraDia);
        let newHeaders = ["IdDia", "TotalPersonas", "IdArea", "Dia", "Nombre"];
        this.jsonCsvSerice.downloadFile(data,'jsontocsv', newHeaders);  
      });
      
    }else{
      return 0;
    }
  }
}
