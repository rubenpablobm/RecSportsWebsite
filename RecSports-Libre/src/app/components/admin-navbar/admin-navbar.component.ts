/* Descripcion de admin-navbar.component.ts: programa que define la logica del componente "admin-navbar".
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: 16/05/2023
Fecha de modificacion: 17/05/2023 */

// Declaracion de importaciones
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrudService } from 'src/app/service/crud.service';

// Decorador del componente
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {
  //Variables
  AreaList:any=[];
  // eID : any = null;
  edificio : any = [];

  // Constructor con dependencias inyectadas
  constructor(private route: ActivatedRoute, private htttp: HttpClient,public crudService:CrudService){ }

  // ngOnInit(){
  //   const idEdificio = this.route.snapshot.paramMap.get('idEdificio');
  //   this.eID = idEdificio;
  //   return this.crudService.EdificioGet(this.eID).subscribe((data:{}) => {
  //     this.edificio = data;
  //     console.log(this.edificio);
  //   })
  // }
  // getArea(){
  //   console.log("voy a llamar a la API :)");
  //   return this.crudService.AreaGetMultiple().subscribe((data:{})=>{
  //     console.log(data);
  //     this.AreaList=data;
  //   })
  // }
}
