/* Descripcion de acceso.component.ts: programa que define la logica del componente "acceso". 
Su propósito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: 01/05/2023
Fecha de modificacion: 17/05/2023 */

// Declaracion de importaciones
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../service/crud.service';

// Decorador del componente
@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent {
  constructor(private route: ActivatedRoute, private htttp: HttpClient, public crudService:CrudService ) { }
  // Definición de variables de clase
  aID : any = null;
  area : any = [];
  mensaje?:string;

  // Obtener el id del área de la ruta y recuperar la información de la misma
  ngOnInit() {
    const idArea = this.route.snapshot.paramMap.get('idArea');
    this.aID = idArea;
    return this.crudService.AreaGetXId(this.aID).subscribe((data:{}) => {
      this.area = data;
      console.log(this.area);
    })
  }
  
  // Llamar al servicio para ejecutar el store procedure "MasAforo" y actualizar la vista
  _MasAforo(){
    return this.crudService.MasAforo(this.aID).subscribe((data:{})=>{
      console.log(data);
      this.ngOnInit();
    },(error) => {
      this.mensaje=String(error.error);
      this.ngOnInit();
    })
  }

  // Llamar al servicio para ejecutar el store procedure "MenosAforo" y actualizar la vista
  _MenosAforo(){
    return this.crudService.MenosAforo(this.aID).subscribe((data:{})=>{
      console.log(data);
      this.ngOnInit();
    },(error) => {
      this.mensaje=String(error.error);
      this.ngOnInit();
    })
  }
}
