/* Descripcion de navbar.component.ts: programa que define la logica del componente "navbar". 
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: 05/05/2023
Fecha de modificacion: 15/06/2023 */

// Declaracion de importaciones
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { authGuard } from '../service/auth.guard';

// Decorador del componente
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../app.component.css']
})

export class NavbarComponent {
  // Variables
  listaEdificios : any = [];
  // Emisor de evento para la foto del enlace
  @Output() linkFoto = new EventEmitter<string>();
  // Validador admin
  auth!: boolean;

  constructor(public crudService:CrudService){
    // Validador admin
    this.auth=authGuard();
  }

  // Metodo para llmara el metodo getEdificios por cada iteracion
  ngOnInit() {
    this.getEdificios();
  }
  
  // Metodo para obtener los edificios
  getEdificios() {
    return this.crudService.EdificioGetMultiple().subscribe((data:{}) => {
      this.listaEdificios = data;
    })
  }

  // Metodo para emitir foto
  enviarFoto(foto : string) {
    this.linkFoto.emit(foto);
  }
  
  cerrarSesion(){
    window.location.reload();
  }
}

