/* Descripcion de area-info.component.ts: programa que define la logica del componente "area-info". 
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 18/05/2023 */

// Declaracion de importaciones
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../service/crud.service';
import { DomSanitizer } from '@angular/platform-browser';

// Decorador del componente
@Component({
  selector: 'app-area-info',
  templateUrl: './area-info.component.html',
  styleUrls: ['./area-info.component.css', '../app.component.css']
})
export class AreaInfoComponent {

  // Propiedades y variables
  aID : any = null;
  area : any = [];
  linkCalendar!: string; 
  descripcion!: string;
  horarios!: string;
  secureLinkCalendar: any = null;

  constructor(private route: ActivatedRoute, private htttp: HttpClient, public crudService:CrudService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // Obtener el id del area de la ruta
    const idArea = this.route.snapshot.paramMap.get('idArea');
    this.aID = idArea;
    return this.crudService.AreaGetXId(this.aID).subscribe((data:{}) => {
      this.area = data;
      // Seleccionar la columna LinkCalendar
      this.linkCalendar = this.area.LinkCalendar;
      if(this.linkCalendar===null){
        this.linkCalendar='SinLink';
      }
      // Purificar el enlace
      this.secureLinkCalendar = this.sanitizer.bypassSecurityTrustResourceUrl(this.linkCalendar);
      this.horarios = this.convertLineBreaks(this.area.Horarios);
      this.descripcion = this.convertLineBreaks(this.area.Descripcion);
      // console.log(this.descripcion);
      console.log(this.area);
      console.log(this.area.Avisos);
      //console.log("sencillamente "+this.area.LinkCalendar);
    })
  }
  
  // Convertir saltos de linea en etiquetas <br>
  convertLineBreaks(text: string): string {
    if (!text) {
      return '';
    }
    return text.replace(/\\n/g, '<br>');
  }

}
