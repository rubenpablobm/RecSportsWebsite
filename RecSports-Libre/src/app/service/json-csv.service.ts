import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})

export class JsonCsvService {
downloadFile(data: any, filename='file', newHeaders:any) {
  let csvData = this.ConvertToCSV(data, newHeaders);
  console.log(csvData)
  let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
  let dwldLink = document.createElement("a");
  let url = URL.createObjectURL(blob);
  let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
  if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
  }
  dwldLink.setAttribute("href", url);
  dwldLink.setAttribute("download", filename + ".csv");
  dwldLink.style.visibility = "hidden";
  document.body.appendChild(dwldLink);
  dwldLink.click();
  document.body.removeChild(dwldLink);
}
ConvertToCSV(objArray: any, headerList: any) {
   let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
   let str = '';
   let row = 'S.No,';
for (let index in headerList) {
       row += headerList[index] + ',';
   }
   row = row.slice(0, -1);
   str += row + '\r\n';
   for (let i = 0; i < array.length; i++) {
       let line = (i+1)+'';
       for (let index in headerList) {
          let head = headerList[index];
line += ',' + array[i][head];
       }
       str += line + '\r\n';
   }
   return str;
}
}

/*
export class JsonCsvService {
  CsvDownload(headers: any, globalData: any) {
    if(!globalData || !globalData.length){
      return;
    }
    const separator = ',';
    const csvContent : any = headers.join(separator) + '\n' + globalData.map(
      (rowData : any) =>{
        return headers.map(
          (headKey : any)=>{
            return rowData [headKey.toLowerCase().replaceAll(' ', '_')]
            ===
            null ||
            rowData[headKey.toLowerCase().replaceAll(' ', '_')] === undefined
            ? ''
            : rowData[headKey.toLowerCase().replaceAll('', '_')];
        }).join(separator);
    }).join('\n');
    this.exportFile(csvContent, 'text/csv');
  }

  exportFile (data: any, fileType: string) {
    const blob = new Blob([data], { type: fileType });
    FileSaver.saveAs(blob, 'Downloaded CSV');
  }

}
*/
