/* Descripcion de edificio.ts: modelo que define el objeto edificio. 
Su proposito es recibir los datos de un edificio. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 19/05/2023 */

export class Edificio {
    IdEdificio!: number; // ID del edificio
    Nombre!: string; // Nombre del edificio
    Foto!: string; // URL de la foto del edificio
    LinkMaps!: string; // Enlace a Google Maps del edificio
}
