/* Descripcion de home.component.ts: programa que define la logica del componente "home". 
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 05/05/2023
Fecha de modificacion: 15/06/2023 */

// Declaracion de importaciones
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { authGuard } from '../service/auth.guard';

// Decorador del componente
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent {
  // Variables
  auth!: boolean;
  eID : any = 0;
  areas : any;
  foto? :string = "https://www.arquired.com.mx/wp-content/uploads/2017/05/campustecmtywh.jpg";

  constructor(private route: ActivatedRoute, private http: HttpClient, public crudService:CrudService, private router: Router ) {
    this.auth=authGuard();
  }

  // Metodo para obtener las areas del edificio
  getAreas() {
    // Obtiene el id del edificio de la ruta
    const idEdificio = this.route.snapshot.paramMap.get('idEdificio');
    // Se identifica el parametro
    if (idEdificio === null) {
      this.eID = 0;
    }else{
      this.eID = Number(idEdificio);  
    }
    // Llama al servicio crudService para obtener las áreas del edificio
    return this.crudService.AreaGetXedificio(this.eID).subscribe((data : {}) => {
      this.areas=data;
    });
  }

  // Metodo para obtener edificios en cada iteracion
  ngOnInit() {
    if(this.areas===undefined){ //Si entra en la pagina, sin haber clickeado el dropdown, tendra la lista de areas aun asi
      this.getAreas();
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getAreas();
      }
    });
  }

  // Metodo para recibir una foto y asignarla a la variable foto
  recibirFoto($event : string){
    this.foto = $event;
  }
}