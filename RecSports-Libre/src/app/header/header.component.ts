/* Descripcion de header.component.ts: programa que define la logica del componente "header". 
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 18/05/2023 */

// Declaracion de importaciones
import { Component, Input } from '@angular/core';

// Decorador del componente
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  // Enlace de la foto del encabezado (opcional)
  @Input() linkFoto? : string;
  // Descripcion del encabezado
  @Input() descripcion! : string;

  ngOnInit(){
    // Imprime el enlace de la foto en la consola
    console.log(this.linkFoto);
    //this.linkFoto="./assets/images/wellness-center.jpeg";
    //this.descripcion="Conoce las areas y lleva el deporte al siguiente nivel";
  }
}
