/* Descripcion de tabla-edificio.component.ts: programa que define la logica del componente "tabla-edificio".
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 25/05/2023
Fecha de modificacion: 15/06/2023 */

import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-edificio',
  templateUrl: './tabla-edificio.component.html',
  styleUrls: ['./tabla-edificio.component.css']
})
export class TablaEdificioComponent {

    // Variables
    @Input() descripcion! : string;
    @Output() linkFoto = new EventEmitter<string>();
    foto? :string = "https://www.arquired.com.mx/wp-content/uploads/2017/05/campustecmtywh.jpg";
    eID : number = 0;
    listaEdificios : any = [];
  
    constructor(public crudService:CrudService, private router: Router){ }
  
    // Metodo que obtiene los edificios al inicializar el componente
    ngOnInit() {
      this.getEdificios();
    }
    
    // Metodo que obtiene los edificios desde el servicio
    getEdificios() {
      return this.crudService.EdificioGetMultiple().subscribe((data:{}) => {
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
    
    borrarRegistro(idEdificio: any, nombreEdificio: any){
      if(window.confirm("Realmente deseas eliminar el edificio "+nombreEdificio)){
        this.crudService.EdificioDelete(idEdificio).subscribe(respuesta =>{
          console.log(this.listaEdificios);
        })
      }
      this.router.navigate(['/']);
    }
   
}
