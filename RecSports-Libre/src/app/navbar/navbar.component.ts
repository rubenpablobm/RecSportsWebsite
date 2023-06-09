/* Descripcion de navbar.component.ts: programa que define la logica del componente "navbar". 
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 19/05/2023 */

// Declaracion de importaciones
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CrudService } from '../service/crud.service';

// Decorador del componente
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../app.component.css']
})

export class NavbarComponent {
  
  // Variables
  listaEdificios : any = [];
  adminEmail? : String;
  // Emisor de evento para la foto del enlace
  @Output() linkFoto = new EventEmitter<string>();
  //@Output() reloadSignal = new EventEmitter<void>();

  constructor(public crudService:CrudService){ }

  // Metodo para llmara el metodo getEdificios por cada iteracion
  ngOnInit() {
    this.getEdificios();
    this.adminEmail = this.crudService.EstaLogeadoEmail();
  }
  
  // Metodo para obtener los edificios
  getEdificios() {
    console.log('Generando dropdown de navbar...')
    return this.crudService.EdificioGetMultiple().subscribe((data:{}) => {
      console.log(data);
      this.listaEdificios = data;
    })
  }

  // Metodo para emitir foto
  enviarFoto(foto : string) {
    this.linkFoto.emit(foto);
  }
  /*
  reloadHome() {
    this.reloadSignal.emit();
  }
  */
}
