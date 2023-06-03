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
        
        //saveAs(resp, `filename.csv`)
        let newHeaders = ["IdHora", "Aforo", "Capacidad", "IdArea", "IdHora"];
        this.jsonCsvSerice.CsvDownload(newHeaders,data);
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
        console.log(data);
        
        //poner aqui la conversion json a csv
      });
      
    }else{
      return 0;
    }
  }


    //

  
  /*
  objArray = 


  //Conversión JSON a CSV
  ConvertToCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No, ';
    for (let index in headerList) {
        row += headerList[index] + ', ';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i & lt; array.length; i++) {
        let line = (i + 1) + & #039;&# 039;;
        for (let index in headerList) {
            let head = headerList[index];
            line += & #039;, &# 039; + array[i][head];
        }
        str += line + & #039;\r\n&# 039;;
    }
    return str;
}
*/
}
