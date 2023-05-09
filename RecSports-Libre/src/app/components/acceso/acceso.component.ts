/* Descripcion de acceso.component.ts: programa que define la logica del componente "acceso".
Su propósito es llamar al servicio API por medio de funciones. 
  
Porpiedad del equipo WellSoft.
Fecha de creacion: 01/05/2023, Fecha de modificacion: 09/05/2023 */

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent {
  constructor(private route: ActivatedRoute, private htttp: HttpClient, public crudService:CrudService ) { }

  aID : any = null;
  area : any = [];

  mensaje?:string;

/* Descripcion de ngOnInit: manda llamar al servicio AreaGetXId para obtener el id del area
 de la ruta y conseguir la informacion del la misma.
Parametro(s): Ninguno.
Complejidad ---> O(1): independientemente de del caso, la funcion ejecuta una sola instruccion. */
  ngOnInit() {
    const idArea = this.route.snapshot.paramMap.get('idArea');
    this.aID = idArea;
    return this.crudService.AreaGetXId(this.aID).subscribe((data:{}) => {
      this.area = data;
      console.log(this.area);
    })
  }

/* Descripcion de _MasAforo: manda llamar el servicio MasAforo para ejecutar el store procedure
MasAforo. En caso de error se manda un mensaje. 
Parametro(s): Ninguno.
Complejidad ---> O(1): independientemente de del caso, la funcion ejecuta una sola instruccion. */
  _MasAforo(){
    return this.crudService.MasAforo(this.aID).subscribe((data:{})=>{
      console.log(data);
      this.ngOnInit();
    },(error) => {
      this.mensaje=String(error.error);
      this.ngOnInit();
    })
  }

/* Descripcion de _MenosAforo: manda llamar el servicio MenosAforo para ejecutar el store procedure
MenosAforo. En caso de error se manda un mensaje.
Parametro(s): Ninguno.
Complejidad ---> O(1): independientemente de del caso, la funcion ejecuta una sola instruccion. */
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
