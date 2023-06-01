import { Component } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-descargar-historico',
  templateUrl: './descargar-historico.component.html',
  styleUrls: ['./descargar-historico.component.css'],
  standalone:true,
  imports: [MatFormFieldModule, MatDatepickerModule, MatNativeDateModule],
})
export class DescargarHistoricoComponent {

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

}
