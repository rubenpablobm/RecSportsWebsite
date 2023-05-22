/* Descripcion de vis.component.ts: programa que define la logica del componente "vis". 
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
  selector: 'app-vis',
  templateUrl: './vis.component.html',
  styleUrls: ['./vis.component.css']
})
export class VisComponent {
  
   // Variables
  @Input() descripcion! : string;
  @Output() linkFoto = new EventEmitter<string>();
  //@Output() reloadSignal = new EventEmitter<void>();
  foto? :string = "https://www.arquired.com.mx/wp-content/uploads/2017/05/campustecmtywh.jpg";
  eID : number = 0;
  listaEdificios : any = [];

  constructor(public crudService:CrudService){ }

  // Metodo que obtiene los edificios al inicializar el componente
  ngOnInit() {
    this.getEdificios();
    console.log(this.linkFoto);
  }
  
  // Metodo que obtiene los edificios desde el servicio
  getEdificios() {
    console.log('Generando dropdown de navbar...')
    return this.crudService.EdificioGet(this.eID).subscribe((data:{}) => {
      console.log(data);
      this.listaEdificios = data;
    })
  }

  // Metodo que recibe la URL de la foto seleccionada
  recibirFoto($event : string){
    this.foto = $event;
  }
 
  // Metodo que envia la URL de la foto seleccionada mediante un evento
  enviarFoto(foto : string) {
    this.linkFoto.emit(foto);
  }
 

  
}
