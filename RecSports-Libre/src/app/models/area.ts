/* Descripcion de area.ts: modelo que define el objeto area. 
Su proposito es recibir los datos de un area. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 19/05/2023 */

export class Area {
  IdArea=0; // ID del area
  Nombre!:string; // Nombre del area
  Foto!:string; // URL de la foto del area
  Croquis!:string; // URL del croquis del area
  Tipo!:string; // Tipo de area
  LinkCalendar!:string; // Enlace al calendario del area
  Descripcion!:string; // Descripcion del area
  Horarios!:string; // Horarios del area
  Avisos?:string; // Avisos relacionados al area
  IdEdificio!:number; // ID del edificio al que pertenece el area
  Aforo?:number; // Capacidad de aforo del area (opcional)
  Capacidad?:number; // Capacidad del area (opcional)
}
