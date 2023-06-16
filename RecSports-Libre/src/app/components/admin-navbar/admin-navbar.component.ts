/* Descripcion de admin-navbar.component.ts: programa que define la logica del componente "admin-navbar".
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 16/05/2023
Fecha de modificacion: 17/05/2023 */

// Declaracion de importaciones
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrudService } from 'src/app/service/crud.service';

import { faBuilding, faChartSimple, faKey } from '@fortawesome/free-solid-svg-icons';

// Decorador del componente
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})

export class AdminNavbarComponent {
  //Variables
  faBuilding = faBuilding;
  faChartSimple = faChartSimple;
  faKey = faKey;
  AreaList:any=[];  
  edificio : any = [];

  // Constructor con dependencias inyectadas
  constructor(private route: ActivatedRoute, private htttp: HttpClient,public crudService:CrudService){ }
}
