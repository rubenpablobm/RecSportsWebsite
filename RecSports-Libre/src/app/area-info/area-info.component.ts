/* Descripcion de area-info.component.ts: programa que define la logica del componente "area-info". 
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Jesús Sebastián Jaime Oviedo
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 9/06/2023 */

// Declaracion de importaciones
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../service/crud.service';
import { DomSanitizer } from '@angular/platform-browser';

import { authGuard } from '../service/auth.guard';

// Decorador del componente
@Component({
  selector: 'app-area-info',
  templateUrl: './area-info.component.html',
  styleUrls: ['./area-info.component.css', '../app.component.css']
})
export class AreaInfoComponent {

  // Propiedades y variables
  mostrarOverlay: boolean = false;
  aID : any = null;
  area : any = [];
  linkCalendar!: string; 
  descripcion!: string;
  horarios!: string;
  secureLinkCalendar: any = null;

  auth!: boolean; //validador admin

  constructor(private route: ActivatedRoute, private htttp: HttpClient, public crudService:CrudService, private sanitizer: DomSanitizer, private router:Router) { 
    this.auth=authGuard(); //validador admin
   }

  ngOnInit() {
    // Obtener el id del area de la ruta
    const idArea = this.route.snapshot.paramMap.get('idArea');
    this.aID = idArea;

    return this.crudService.AreaGetXId(this.aID).subscribe((data:{}) => {
      this.area = data;
      // Seleccionar la columna LinkCalendar
      this.linkCalendar = this.area.LinkCalendar;
      // if((this.linkCalendar===null) || (this.linkCalendar === '')){
      //   this.linkCalendar=SinLink;
      // }
      // Purificar el enlace
      this.secureLinkCalendar = this.sanitizer.bypassSecurityTrustResourceUrl(this.linkCalendar);
      this.horarios = this.convertLineBreaks(this.area.Horarios);
      this.descripcion = this.convertLineBreaks(this.area.Descripcion);
    })
  }
  
 /* edit(text: string): string{
    if (text) {
      return '';
    }
    return text.replace(/\\n/g, '<br>');
  }*/
  // Convertir saltos de linea en etiquetas <br>
  convertLineBreaks(text: string): string {
    if (!text) {
      return '';
    }
    return text.replace(/\\n/g, '<br>');
  }

  limpiarAforo(){
    this.mostrarOverlay = true;
    setTimeout(() => {
      if (window.confirm("Realmente deseas vaciar el area tipo aforo")) {
        this.crudService.LimpiarAforo(this.aID).subscribe({
          next:(res:any)=>{
            console.log("Aforo limpiado del area " + this.aID);
          },
          error: (e) => console.log(e)
        });
        this.mostrarOverlay = false;
        this.router.navigateByUrl('');
      }
      else{
        this.mostrarOverlay = false;
      }
    }, 100);
  }

  borrarRegistro(idArea: any, nombreArea: any) {
    console.log(idArea);
  
    this.mostrarOverlay = true;
  
    setTimeout(() => {
      if (window.confirm("¿Realmente deseas eliminar el registro título = " + nombreArea)) {
        this.crudService.AreaDelete(idArea).subscribe(respuesta => {
          console.log(this.area);
        });
        this.mostrarOverlay = false;
        window.history.back();
      }else{
        this.mostrarOverlay = false;
      }
    
      

    }, 100);
    
  }

}
